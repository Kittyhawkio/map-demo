import axios from 'axios';
import {ALOFT_TOKEN} from "constants/appConstants";

const axiosInstance = axios.create();

const aloftToken = localStorage.getItem(ALOFT_TOKEN);

axiosInstance.interceptors.request.use(async request => {
	//Append token to request
	request.headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest'
	};
	if (aloftToken) {
		request.headers.Authorization = `Bearer ${aloftToken}`;
	}

	return request;
});

export default axiosInstance;
