import axios from "axios";

const api = axios.create({
  baseURL: "https://ticket-booking-server-kbu3.onrender.com/api",
});

export default api;