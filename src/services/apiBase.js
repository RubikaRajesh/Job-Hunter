import axios from "axios";
import { api_url } from "../../config";  // Assuming you have a config file

const instance = axios.create({
  baseURL: api_url,  // Use the backend URL here
  withCredentials: true,
  
});

export async function apiCall(method, url, data) {
  console.log(method, url, data); // Log the method, URL, and data
  try {
    const res = await instance[method](url, data);  // Ensure method is 'post', 'get', etc.
    return res.data.data;  // Assuming your response data structure has a 'data' property
  } catch (error) {
    console.error("API call error:", error.response ? error.response.data : error.message);
    throw error;  // Re-throw to allow further handling if needed
  }
}
export default instance;