// api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL,
});

const privateApi = async (options) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
        options.headers = {
            ...options.headers,
            'auth-token': `Bearer ${token}`,
        };
    }
    return api(options);
};

const publicApi = (options) => {
    return api(options);
};

export { publicApi, privateApi };