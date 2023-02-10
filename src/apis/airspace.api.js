import axiosInstance from "services/axiosConfig";
import {ALOFT_API_URL} from "constants/appConstants";

export const fetchMapLayersAndSources = async (addError) => {
    try {
        const url = localStorage.getItem(ALOFT_API_URL)
        const res = await axiosInstance.get(url);
        return res.data.data;
    } catch(e) {
        if (e.response.status === 404) {
            addError({type: 'error', message: `Aloft API Error: Incorrect URL: ${e.message}`})
        } else {
            addError({type: 'error', message: `Aloft API Error: ${e.message}`})
        }
        console.error(e)
    }
}