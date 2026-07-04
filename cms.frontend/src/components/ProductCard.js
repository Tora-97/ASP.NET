import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import hook giỏ hàng

export default function ProductCard({ product = {} }) {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ

    const name = product.Name || product.name || "Sản phẩm không tên";
    const price = product.Price || product.price || 0;
    const image = product.Image || product.image || product.ImageUrl || product.imageUrl || ""; 
    const label = product.CategoryProduct?.Name || product.Label || product.label || null;
    const id = product.Id || product.id || 0;
    const isAvailable = product.IsAvailable !== undefined ? product.IsAvailable : (product.isAvailable ?? true);

    const getImageUrl = (imgStr) => {
        if (!imgStr) return '/default.jpg';
        if (imgStr.startsWith('http')) return imgStr;
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076';
        const cleanImgStr = imgStr.replace(/^\/?uploads\//, ''); 
        return `${baseUrl}/uploads/${cleanImgStr}`;
    };

    // HÀM XỬ LÝ KHI BẤM "MUA NGAY"
    const handleBuyNow = () => {
        // 1. Thêm sản phẩm vào giỏ (Gán mặc định size M và màu cơ bản vì mua nhanh)
        addToCart({
            id: id,
            title: name,
            price: price,
            image: getImageUrl(image),
            quantity: 1,
            size: "M", 
            color: "Mặc định"
        });
        
        // 2. Chuyển hướng thẳng sang trang thanh toán
        navigate('/checkout');
    };

    return (
        <article className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:shadow-lg transition-shadow duration-300">
            {/* ... Phần render ảnh và tiêu đề giữ nguyên ... */}
            <div className="relative aspect-[3/4] bg-surface-bright overflow-hidden">
                <Link to={`/product/${id}`}>
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getImageUrl(image)} alt={name} onError={(e) => { e.target.src = '/default.jpg'; }} />
                </Link>
                {label && (
                    <div className="absolute top-2 left-2 bg-dark text-white font-label-md text-[10px] px-2 py-1 rounded-sm uppercase font-bold tracking-wider pointer-events-none">{label}</div>
                )}
            </div>

            <div className="p-3 flex flex-col flex-1 text-center">
                <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
                    <h5 className="font-body-md text-body-md font-bold text-on-surface line-clamp-2 mb-1">{name}</h5>
                </Link>
                <div className="font-body-lg text-body-lg font-bold text-danger mb-3 mt-auto">
                    {price > 0 ? `${price.toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                </div>

                <div className="flex gap-2 mt-auto">
                    <Link to={`/product/${id}`} className="flex-1 btn btn-primary rounded px-2 py-1.5 font-label-md text-[11px] font-bold flex flex-col items-center justify-center transition-colors">
                        Chi tiết
                    </Link>

                    {isAvailable ? (
                        // ĐỔI <Link> THÀNH <button> VÀ GỌI handleBuyNow
                        <button 
                            onClick={handleBuyNow} 
                            className="flex-1 bg-primary-container text-on-primary-container rounded px-2 py-1.5 font-label-md text-[11px] font-bold flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-colors text-center"
                        >
                            Mua ngay
                        </button>
                    ) : (
                        <button className="flex-1 bg-secondary text-white opacity-50 cursor-not-allowed rounded px-2 py-1.5 font-label-md text-[11px] font-bold">
                            Hết hàng
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}