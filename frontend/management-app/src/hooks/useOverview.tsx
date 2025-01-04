import { useEffect, useReducer } from "react";
import { getSalesData } from "../api/overview/overview-api";
import { MarketingItem } from "@/types/types";

const initialState: State = {
    salesData: [],
    marketingData: [],
    defaultSelectedForSales: "Sales",
    period: ["Monthly", "Quarterly", "Yearly"]
};

type State = {
    salesData: any[];
    marketingData: MarketingItem[];
    defaultSelectedForSales: string;
    period: string[];
};

type SetSalesDataAction = {
    type: "SET_SALES_DATA";
    payload: any[];
};

type SelectTypeForSalesAction = {
    type: "SELECT_TYPE_FOR_SALES";
    payload: string;
};

type FilterSalesDataAction = {
    type: "FILTER_SALES_DATA";
    payload: any[];
};

type Action = SetSalesDataAction | SelectTypeForSalesAction | FilterSalesDataAction;

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_SALES_DATA":
            return { ...state, salesData: action.payload };
        case "SELECT_TYPE_FOR_SALES":
            return { ...state, defaultSelectedForSales: action.payload };
        case "FILTER_SALES_DATA":
            return { ...state, salesData: action.payload };
        default:
            return state;
    }
};

const useOverview = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getTimeFrames = () => state.period;

    const setSelectedTypeForSales = (type: string) => { 
        dispatch({ type: "SELECT_TYPE_FOR_SALES", payload: type });
        filterSalesData(type);  // Automatically filter sales data when type is selected
    }

    const getSelectedDataTypeForSales = () => {
        switch (state.defaultSelectedForSales.toLocaleLowerCase()) {
            case 'monthly':
                return filterSalesData('monthly');
            case 'quarterly':
                return filterSalesData('quarterly');
            case 'yearly':
                return filterSalesData('yearly');
            default:
                return state.salesData;
        }
    }

    const filterSalesData = (timeFrame: string) => {
        const today = new Date();
        let startDate;

        switch (timeFrame) {
            case "monthly":
                startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                break;
            case "quarterly":
                startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
                break;
            case "yearly":
                startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                break;
            default:
                startDate = new Date(0);
                break;
        }

        const filteredData = state.salesData.map((item: { date_of_sale: string; amount: number; id: number; }) => {
            const saleDate = new Date(item.date_of_sale);
            const daysDifference = Math.floor((today.getTime() - saleDate.getTime()) / (1000 * 60 * 60 * 24));
            const updatedSaleDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysDifference).toISOString().split('T')[0];
            return { ...item, date_of_sale: updatedSaleDate };
        }).filter((item: { date_of_sale: string; }) => {
            const saleDate = new Date(item.date_of_sale);
            return saleDate >= startDate && saleDate <= today;
        });

        return filteredData.length > 0 ? filteredData : [];
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getSalesDataHelper = async () => {
            try {
                const response = await getSalesData(signal);
                if (response) {
                    dispatch({ type: "SET_SALES_DATA", payload: response });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getSalesDataHelper();

        return () => {
            controller.abort();
        };
    }, []);

    return { state, getTimeFrames, setSelectedTypeForSales, getSelectedDataTypeForSales };
};

export default useOverview;
