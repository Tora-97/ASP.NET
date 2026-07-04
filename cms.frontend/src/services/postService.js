import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

const postService = {
    // URL cũ: /BlogsApi -> URL mới: /posts/get-all-api
    getAll: async () => {
        return await axios.get(`${API_BASE_URL}/posts/get-all-api`);
    },

    // URL mới: /posts/detail-api/{id}
    getDetail: async (id) => {
        return await axios.get(`${API_BASE_URL}/posts/detail-api/${id}`);
    },

    create: async (postData) => {
        return await axios.post(`${API_BASE_URL}/posts/create-api`, postData);
    }
};

export default postService;