import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            // Đồng bộ Id (C#) hoặc id (React)
            const incomingId = product.id || product.Id;
            
            const existingItemIndex = prev.findIndex(item => 
                (item.id || item.Id) === incomingId && 
                item.size === product.size && 
                item.color === product.color
            );

            if (existingItemIndex >= 0) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += (product.quantity || 1);
                return newCart;
            }
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            const currentId = item.id || item.Id;
            if (currentId === id) {
                const newQty = (item.quantity || 1) + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => (item.id || item.Id) !== id));
    };

    // Thêm hàm dọn giỏ hàng (Dùng sau khi thanh toán xong)
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);