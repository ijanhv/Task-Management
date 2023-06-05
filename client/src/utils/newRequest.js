import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://task-management-kvox.onrender.com/api" || "http://localhost:8800/api",
    withCredentials: true,
})

export default newRequest;