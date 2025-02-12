import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ezexplanation.com/api/",
  headers: {
    Authorization: "d86a715f865f41d622295540d4944c12",
  },
});

export default axiosInstance;
