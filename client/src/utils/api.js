import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const token = JSON.parse(userInfo).token;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const loginUser = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    return data;
};

export const fetchPublicData = async () => {
    const { data } = await api.get('/public/data');
    return data;
};

// Admin API calls
export const updateSectionData = async (section, content) => {
    const { data } = await api.put(`/sections/${section}`, content);
    return data;
};

export const addCollectionItem = async (collection, item) => {
    const { data } = await api.post(`/collections/${collection}`, item);
    return data;
};

export const updateCollectionItemData = async (collection, id, item) => {
    const { data } = await api.put(`/collections/${collection}/${id}`, item);
    return data;
};

export const deleteCollectionItemData = async (collection, id) => {
    const { data } = await api.delete(`/collections/${collection}/${id}`);
    return data;
};

export default api;
