import axios from "axios";

const URI = "http://127.0.0.1:5000/api";

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