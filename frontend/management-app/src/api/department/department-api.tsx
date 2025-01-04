import axios from "axios";
import { URI } from "../uri";

export const getDepartments = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URI}/departments`, { signal });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}