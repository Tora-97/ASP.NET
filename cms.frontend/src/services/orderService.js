import { API_BASE_URL } from './apiConfig';

const orderService = {
    // 1. Tạo đơn hàng mới (Checkout)
    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE_URL}/orders/create-checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error("Lỗi khi đặt hàng");
        return await response.json();
    },

    // 2. Lấy danh sách đơn hàng
    getAllOrders: async () => {
        const response = await fetch(`${API_BASE_URL}/orders/get-all`);
        if (!response.ok) throw new Error("Lỗi khi lấy đơn hàng");
        return await response.json();
    },

    // 3. Lấy chi tiết đơn hàng
    getOrderById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/orders/detail/${id}`);
        if (!response.ok) throw new Error("Lỗi khi lấy chi tiết đơn hàng");
        return await response.json();
    }
};

export default orderService;