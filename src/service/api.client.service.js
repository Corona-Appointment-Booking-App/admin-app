import axios from "axios";

let headers = {};

const authToken = localStorage.getItem("authToken") || null;
if (authToken) {
  headers = {
    Authorization: `Bearer ${authToken}`,
  };
}

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers,
});

export default apiClient;
