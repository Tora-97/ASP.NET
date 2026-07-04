import React from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    // PHÁ GÓI AN TOÀN: Bắt mọi trường hợp chữ Hoa/Thường
    const id = item.id || item.Id;
    const title = item.title || item.Name || item.name || "Sản phẩm";
    const price = item.price || item.Price || 0;
    const image = item.image || item.ImageUrl || item.imageUrl || '/default.jpg';
    const size = item.size || 'M';
    const color = item.color || 'Mặc định';
    const quantity = item.quantity || 1;
    const category = item.category || item.CategoryName || "Sản phẩm";

    // Hàm lấy ảnh (Phòng trường hợp link CSDL chưa chuẩn)
    const getImageUrl = (imgStr) => {
        if (!imgStr) return '/default.jpg';
        if (imgStr.startsWith('http')) return imgStr;
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076';
        const cleanImgStr = imgStr.replace(/^\/?uploads\//, ''); 
        return `${baseUrl}/uploads/${cleanImgStr}`;
    };

    return (
        <div className="bg-surface-container-lowest p-gutter rounded-lg border border-outline-variant shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex gap-gutter items-center transition-all duration-200 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
            
            <Link to={`/product/${id}`} className="w-32 h-40 bg-surface-container-high rounded overflow-hidden flex-shrink-0 cursor-pointer group">
                <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={getImageUrl(image)} 
                    alt={title} 
                    onError={(e) => { e.target.src = '/default.jpg'; }}
                />
            </Link>

            <div className="flex-grow flex flex-col justify-between h-full py-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-label-md font-label-md text-primary uppercase tracking-wider mb-1">
                            {category}
                        </p>
                        <Link to={`/product/${id}`}>
                            <h3 className="font-headline-md text-headline-md text-on-surface mb-1 hover:text-primary transition-colors cursor-pointer">
                                {title}
                            </h3>
                        </Link>
                        <p className="text-body-md font-body-md text-outline">
                            Size: {size} | Màu: {color}
                        </p>
                    </div>
                    <button 
                        onClick={() => onRemove(id)} // Truyền đúng id đã xử lý
                        className="text-outline hover:text-tertiary p-1 rounded-full hover:bg-surface-container transition-colors"
                        title="Xóa sản phẩm"
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border border-outline-variant rounded">
                        <button 
                            onClick={() => onUpdateQuantity(id, -1)} // Truyền đúng id đã xử lý
                            className="px-3 py-1 hover:bg-surface-container transition-colors text-on-surface"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 font-body-md border-x border-outline-variant text-center min-w-[40px]">
                            {quantity}
                        </span>
                        <button 
                            onClick={() => onUpdateQuantity(id, 1)} // Truyền đúng id đã xử lý
                            className="px-3 py-1 hover:bg-surface-container transition-colors text-on-surface"
                        >
                            +
                        </button>
                    </div>
                    <p className="font-headline-md text-headline-md text-primary font-bold">
                        {/* Giá tiền không bao giờ bị NaN nữa */}
                        {(price * quantity).toLocaleString('vi-VN')}đ
                    </p>
                </div>
            </div>
        </div>
    );
}