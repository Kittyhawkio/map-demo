import axios from 'axios';
import { getAloftTokenFromLS } from 'actions/localStorage';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async request => {
	//Append token to request
	const token =  process.env.REACT_APP_ALOFT_TOKEN //TODO replace with token from LS

	request.headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest'
	};
	if (token) {
		request.headers.Authorization = `Bearer ${token}`; //TODO replace with token from LS
	}

	return request;
});

export default axiosInstance;
