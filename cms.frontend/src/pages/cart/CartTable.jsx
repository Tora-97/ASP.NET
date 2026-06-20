import React from 'react';

export default function CartTable({ items, onUpdateQuantity, onRemoveItem }) {
    if (items.length === 0) {
        return (
            <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[48px] text-outline mb-4">remove_shopping_cart</span>
                <p className="font-body-lg text-on-surface-variant mb-4">Giỏ hàng của bạn đang trống.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-stack-md">
            {items.map((item) => (
                <div key={item.id} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant flex gap-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] relative overflow-hidden">
                    
                    {/* Ảnh sản phẩm */}
                    <div className="w-24 h-32 flex-shrink-0 bg-surface-container rounded overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                    
                    {/* Thông tin và chức năng */}
                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            <h3 className="font-body-md font-bold text-on-surface">{item.title}</h3>
                            <p className="font-label-md text-on-surface-variant">Size: {item.size} | Color: {item.color}</p>
                            <p className="font-body-lg font-bold text-primary mt-1">
                                {item.price.toLocaleString('vi-VN')}₫
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                            {/* Nút tăng giảm số lượng */}
                            <div className="flex items-center border border-outline-variant rounded">
                                <button 
                                    className="px-2 py-1 text-primary hover:bg-surface-container-low transition-colors"
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                >
                                    <span className="material-symbols-outlined text-[18px]">remove</span>
                                </button>
                                <span className="px-3 font-label-lg text-on-surface">{item.quantity}</span>
                                <button 
                                    className="px-2 py-1 text-primary hover:bg-surface-container-low transition-colors"
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                >
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                </button>
                            </div>
                            
                            {/* Nút xóa */}
                            <button 
                                className="text-on-surface-variant hover:text-error transition-colors"
                                onClick={() => onRemoveItem(item.id)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}