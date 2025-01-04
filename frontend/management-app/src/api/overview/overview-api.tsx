import axios from "axios";
import { URI } from "../uri";

export const getSalesData = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/sales`, { signal });
        console.log('sales data : ', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getMarketingData = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/marketing`, { signal });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}