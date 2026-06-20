import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product = {} }) {
    const { 
        id = 0, 
        title = "Sản phẩm đang cập nhật", 
        price = 0, 
        image = "", 
        label, 
        isAvailable = true 
    } = product;

    return (
        <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[3/4] bg-surface-bright overflow-hidden">
                <Link to={`/product/${id}`}>
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={image} alt={title} />
                </Link>
                {label && (
                    <div className="absolute top-2 left-2 bg-tertiary text-on-tertiary font-label-md text-[10px] px-2 py-1 rounded-sm uppercase font-bold tracking-wider pointer-events-none">
                        {label}
                    </div>
                )}
            </div>
            
            <div className="p-3 flex flex-col flex-1">
                <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-body-md text-body-md font-bold text-on-surface line-clamp-2 mb-1">{title}</h3>
                </Link>
                
                <div className="font-body-lg text-body-lg font-bold text-tertiary mb-3 mt-auto">
                    {price > 0 ? `${price.toLocaleString('vi-VN')} ₫` : 'Hết hàng'}
                </div>
                
                <div className="flex gap-2 mt-auto">
                    <Link to={`/product/${id}`} className="flex-1 border border-primary text-primary rounded px-2 py-1.5 font-label-md text-[11px] font-bold flex flex-col items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[16px] mb-0.5">visibility</span> Chi tiết
                    </Link>
                    
                    {isAvailable ? (
                        /* ĐÃ SỬA THÀNH LINK CHUYỂN HƯỚNG TỚI GIỎ HÀNG */
                        <Link to="/cart" className="flex-1 bg-primary-container text-on-primary-container rounded px-2 py-1.5 font-label-md text-[11px] font-bold flex flex-col items-center justify-center hover:bg-primary hover:text-on-primary transition-colors text-center">
                            <span className="material-symbols-outlined text-[16px] mb-0.5">shopping_cart</span> Mua ngay
                        </Link>
                    ) : (
                        <button className="flex-1 bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed rounded px-2 py-1.5 font-label-md text-[11px] font-bold flex flex-col items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] mb-0.5">remove_shopping_cart</span> Hết hàng
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}