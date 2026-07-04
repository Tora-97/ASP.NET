import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const categoryService = {
    getAll: async () => {
        // ĐÃ SỬA: Đổi tên đuôi thành categoriesproducts
        const url = API_BASE_URL.includes('/api') 
            ? `${API_BASE_URL}/categoriesproducts` 
            : `${API_BASE_URL}/api/categoriesproducts`;
            
        const response = await axios.get(url);
        return response.data; 
    },

    getAllCategories: async () => {
        // ĐÃ SỬA TƯƠNG TỰ BÊN DƯỚI
        const url = API_BASE_URL.includes('/api') 
            ? `${API_BASE_URL}/categoriesproducts` 
            : `${API_BASE_URL}/api/categoriesproducts`;
            
        const response = await axios.get(url);
        return response.data;
    }
};

export default categoryService;