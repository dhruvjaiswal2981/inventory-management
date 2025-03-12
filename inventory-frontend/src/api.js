import axios from "axios";

const API_URL = "http://localhost:5000";

export const getProducts = async () => axios.get(`${API_URL}/products`);
export const addProduct = async (product) => axios.post(`${API_URL}/products`, product);
export const placeOrder = async (order) => axios.post(`${API_URL}/orders`, order);
export const getStockAlerts = async () => axios.get(`${API_URL}/stock-alerts`);
