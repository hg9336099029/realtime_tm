// src/api/authapi.jsx
import axios from "../api/axios";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        return { data: response.data, error: null };
    } catch (err) {
        return {
            data: null,
            error:
                err.response?.data?.msg ||
                err.response?.data?.error ||
                'Login failed. Please try again.',
        };
    }
};

export const registerUser = async (email, password, username) => {
    try {
        const response = await axios.post('/auth/login', { email, password, username });
        return { data: response.data, error: null };
    }
    catch (error) {
        return {
            data: null,
            error:
                err.response?.data?.msg ||
                err.response?.data?.error ||
                'Login failed. Please try again.',
        };
    }

}
