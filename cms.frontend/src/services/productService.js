import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const productService = {
    // Hàm cũ bạn đang dùng
    getAllProducts: async () => {
        const response = await axios.get(`${API_BASE_URL}/ProductsApi`);
        return response.data;
    },

    // THÊM HÀM NÀY VÀO ĐỂ DÙNG TRONG PRODUCT INFO
    getProductById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/ProductsApi/${id}`);
        return response.data;
    }
};

export default productService;