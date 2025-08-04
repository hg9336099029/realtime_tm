import axios from "../api/axios";

// Login API
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

// Register API

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await axios.post('/auth/register',
      { username: name, email, password }, 
      { withCredentials: true }
    );
    return { data: res.data };
  } catch (err) {
    const error = err.response?.data?.msg || "Registration failed";
    return { error };
  }
};

