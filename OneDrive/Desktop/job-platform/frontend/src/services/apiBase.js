import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const apiCall = async (method, url, data = null, config = {}) => {
  try {
    const response = await apiClient({ method, url, data, ...config });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;