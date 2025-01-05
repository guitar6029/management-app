import axios from "axios";
import { URI } from "../uri";

export const getListOfCurrencies = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/stockmarket/currencies`, { signal });
        console.log("stockmarket currencies", response);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }

}


export const getTickerStockInfo = async (ticker: string, signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/stockmarket/${ticker}`, { signal });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}