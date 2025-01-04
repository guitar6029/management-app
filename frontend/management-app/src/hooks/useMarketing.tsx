import { useReducer, useEffect } from "react";
import { MarketingItem } from "@/types/types";
import { getMarketingData } from "@/api/marketing/marketing-api";

const initialState = {
    marketing: [],
}

type State = {
    marketing: MarketingItem[];
}

type Action = {
    type: string;
    payload: MarketingItem[] | any[];
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_MARKETING_DATA":
            return { ...state, marketing: action.payload };
        default:
            return state;
    }
}

const useMarketing = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getMarketingDataHelper = async () => {
            try {
                const response = await getMarketingData(signal);
                if (response) {
                    dispatch({ type: "SET_MARKETING_DATA", payload: response });
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

    return state
}


export const marketingListIsEmpty = (state: State) => state.marketing.length === 0;
export default useMarketing;