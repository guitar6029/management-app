import { useEffect, useReducer } from "react";
import { getListOfCurrencies, getTickerStockInfo} from "../api/stockmarket/stockmarket-api";

const intialState = {
    listOfCurrencies: [],
    defaultTicker: "APPL",
    tickerStockInfo: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TICKER_STOCK_INFO':
            return { ...state, tickerStockInfo: action.payload };
        case 'GET_LIST_OF_CURRENCIES':
            return { ...state, listOfCurrencies: action.payload };
        default:
            return state
    }
}

const useStockMarket = () => {
    
    const [state, dispatch] = useReducer(reducer, intialState);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;


    //     const getTickerStockInfoHeler = async () => {
    //         try{
    //             let ticker = "APPL";
    //             const response = await getTickerStockInfo(ticker, signal);
    //             if (response) {
    //                 dispatch({ type: "SET_TICKER_STOCK_INFO", payload: response})
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
        


    //     getTickerStockInfoHeler();

    //     return () => {
    //         controller.abort();
    //     }
    // }, []);


    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;
    //     const getListOfCurrenciesHelper = async () => {
    //         try{
    //             const response = await getListOfCurrencies(signal);
    //             if (response) {
    //                 dispatch({ type: "SET_LIST_OF_CURRENCIES", payload: response})
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getListOfCurrenciesHelper();

    //     return () => {
    //         controller.abort()
    //     }

    // }, []);


    return { state}
}

export default useStockMarket;