import axios from "axios";
import store from "../app/store";
import { setAccessToken } from "../features/accessTokenSlice";
const instance = axios.create({
    baseURL: 'http://localhost:3008',
    headers: {
        "Content-Type": "application/json"
    }
});

instance.defaults.withCredentials = true;

let isRefreshing = false;

instance.interceptors.request.use(function (config) {

    let headersToken = store.getState().accessToken.value;
    if (headersToken) {
        config.headers.Authorization = `Bearer ${headersToken}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const newToken = await refreshAccessToken();
                store.dispatch(setAccessToken(newToken));
                instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                isRefreshing = false;
                return instance(originalRequest);
            } catch (err) {
                isRefreshing = false;
                return Promise.reject(err);
            }
        } else {
            return new Promise((resolve, reject) => {
                const checkRefresh = setInterval(() => {
                    const token = store.getState().accessToken;
                    if (!isRefreshing) {
                        clearInterval(checkRefresh);
                        if (token) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(instance(originalRequest));
                        } else {
                            reject(error);
                        }
                    }
                }, 1000);
            });
        }
    }
    return Promise.reject(error);
});

async function refreshAccessToken() {
    try {
        const response = await instance.post('/api/user/refresh-token', { refreshToken: store.getState().refreshToken.value });
        console.log('call: ',response.accessToken);
        return response.accessToken;
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
}
export default instance;