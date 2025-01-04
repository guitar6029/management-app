import axios from "axios";
import { URI } from "../uri";


export const getEvents = async (signal: AbortSignal) => { 
    try {
        const response = await axios.get(`${URI}/events`, { signal });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}