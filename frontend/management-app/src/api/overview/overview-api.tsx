import axios from "axios";
import { URI } from "../uri";

export const getSalesData = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/sales`, { signal });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
