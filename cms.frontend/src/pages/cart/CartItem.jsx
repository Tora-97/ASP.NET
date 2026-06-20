import React from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="bg-surface-container-lowest p-gutter rounded-lg border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex gap-gutter items-center transition-all duration-200 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
            
            {/* Ảnh sản phẩm (Nhấp vào thì xem chi tiết) */}
            <Link to={`/product/${item.id}`} className="w-32 h-40 bg-surface-container-high rounded overflow-hidden flex-shrink-0 cursor-pointer group">
                <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={item.image} 
                    alt={item.title} 
                />
            </Link>

            <div className="flex-grow flex flex-col justify-between h-full py-1">
                {/* Tiêu đề & Xóa */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-label-md font-label-md text-primary uppercase tracking-wider mb-1">
                            {item.category || "Sản phẩm"}
                        </p>
                        <Link to={`/product/${item.id}`}>
                            <h3 className="font-headline-md text-headline-md text-on-surface mb-1 hover:text-primary transition-colors cursor-pointer">
                                {item.title}
                            </h3>
                        </Link>
                        <p className="text-body-md font-body-md text-outline">
                            Size: {item.size} | Màu: {item.color}
                        </p>
                    </div>
                    <button 
                        onClick={() => onRemove(item.id)}
                        className="text-outline hover:text-tertiary p-1 rounded-full hover:bg-surface-container transition-colors"
                        title="Xóa sản phẩm"
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>

                {/* Tăng giảm & Giá tiền */}
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border border-outline-variant rounded">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-surface-container transition-colors text-on-surface"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 font-body-md border-x border-outline-variant text-center min-w-[40px]">
                            {item.quantity}
                        </span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-surface-container transition-colors text-on-surface"
                        >
                            +
                        </button>
                    </div>
                    <p className="font-headline-md text-headline-md text-primary font-bold">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </p>
                </div>
            </div>
        </div>
    );
}