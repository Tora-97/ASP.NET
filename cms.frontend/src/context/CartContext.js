import React, { createContext, useState } from 'react';

// 1. Khởi tạo Context
export const CartContext = createContext();

// 2. Tạo Provider để bọc toàn bộ ứng dụng
export const CartProvider = ({ children }) => {
    // Lưu tổng số lượng sản phẩm trong giỏ (Giả lập ban đầu là 2 món giống thiết kế cũ)
    const [cartCount, setCartCount] = useState(2); 

    // Hàm gọi khi người dùng bấm "Thêm vào giỏ hàng"
    const addToCart = (quantity = 1) => {
        setCartCount(prevCount => prevCount + quantity);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};