import { useReducer, useEffect } from "react";
import { MarketingItem } from "@/types/types";
import { getMarketingData } from "@/api/marketing/marketing-api";

const initialState = {
    marketing: [],
    availableCategories: [],
    selectedInvestmentCategory: "Blockchain"
}

type State = {
    marketing: MarketingItem[];
    selectedInvestmentCategory: string;
    availableCategories: string[];
}

type Action =
    | { type: "SET_MARKETING_DATA"; payload: MarketingItem[] }
    | { type: "SET_CATEGORY_GOALS"; payload: string[] }
    | { type: "SELECT_CATEGORY"; payload: string };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_MARKETING_DATA":
            return { ...state, marketing: action.payload };
        case "SET_CATEGORY_GOALS":
            return { ...state, availableCategories: action.payload };
        case "SELECT_CATEGORY":
            return { ...state, selectedInvestmentCategory: action.payload };
        default:
            return state;
    }
}

const useMarketing = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setSelectedCategoryForMarketing = (category: string) => {
        console.log("selected category: ", category);
        dispatch({ type: "SELECT_CATEGORY", payload: category });
    }

    const getSelectedCategoryForMarketing = () => {
        return state.marketing.filter((item: MarketingItem) => item.investment_focus === state.selectedInvestmentCategory);
    }

    const setAvailableCategories = (categories: string[]) => {
        dispatch({ type: "SET_CATEGORY_GOALS", payload: categories });
    }

    const getAvailableCategories = () => {
        return state.availableCategories;
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getMarketingDataHelper = async () => {
            try {
                const response = await getMarketingData(signal);
                if (response) {
                    dispatch({ type: "SET_MARKETING_DATA", payload: response });

                    // Set the available categories
                    const categories = response.map((item: MarketingItem) => item.investment_focus);
                    const uniqueCategories = Array.from(new Set(categories)) as string[];
                    setAvailableCategories(uniqueCategories);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getMarketingDataHelper();

        return () => {
            controller.abort();
        }
    }, []);

    return { state, setSelectedCategoryForMarketing, getSelectedCategoryForMarketing, getAvailableCategories };
}

export const marketingListIsEmpty = (state: State) => state.marketing.length === 0;
export default useMarketing;
