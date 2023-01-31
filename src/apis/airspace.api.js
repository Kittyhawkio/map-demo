import axiosInstance from "services/axiosConfig";
import {getAloftApiURLFromLS} from "actions/localStorage";

export const fetchMapLayersAndSources = async () => {
    try {
        const url = getAloftApiURLFromLS();
        const res = await axiosInstance.get(url);
        return res.data.data;
    } catch(e) {
        console.error(e)
    }
}