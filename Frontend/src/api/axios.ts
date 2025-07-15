import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://blogit-website-5.onrender.com",
    withCredentials: true
})

export default axiosInstance;
