import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Bắt buộc import Link
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function ProductInfo({ product, id }) {
    // Quản lý trạng thái tương tác của người dùng
    const [activeSize, setActiveSize] = useState('M');
    const [activeColor, setActiveColor] = useState('#006874');

    // Trạng thái nút Thêm vào giỏ hàng
    const [cartStatus, setCartStatus] = useState('idle'); // idle | loading | success
    const { addToCart } = useContext(CartContext);
    const {
        title = "Áo Sơ Mi Linen Teal",
        price = 850000,
        originalPrice = 1150000,
        desc = "Dòng sản phẩm Linen cao cấp từ VibeThread mang đến sự kết hợp hoàn hảo giữa vẻ đẹp mộc mạc và sự sang trọng hiện đại. Chất liệu vải được dệt từ sợi lanh tự nhiên 100%, đảm bảo độ thoáng mát tối đa cho khí hậu nhiệt đới."
    } = product;

    const colors = ['#006874', '#0D4C73', '#EEEEEE', '#2e3132'];
    const sizes = ['S', 'M', 'L', 'XL'];

    // Xử lý hiệu ứng thêm vào giỏ hàng
    const handleAddToCart = () => {
        setCartStatus('loading');
        setTimeout(() => {
            setCartStatus('success');
            addToCart(1); // <--- THÊM DÒNG NÀY ĐỂ TĂNG 1 SẢN PHẨM TRÊN HEADER
            setTimeout(() => {
                setCartStatus('idle');
            }, 2000);
        }, 1000);
    };

    return (
        <div className="w-full md:w-1/2 flex flex-col gap-1 pb-24 md:pb-0">
            {/* Title & Price */}
            <div className="flex justify-between items-start">
                <h2 className="font-headline-lg text-headline-lg text-on-surface-variant max-w-[70%]">
                    {title}
                </h2>
                <div className="flex flex-col items-end">
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                        {price.toLocaleString('vi-VN')}đ
                    </span>
                    {originalPrice && (
                        <span className="font-label-md text-label-md text-outline line-through">
                            {originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                    )}
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1 mb-4">
                {[1, 2, 3, 4].map(star => (
                    <span key={star} className="material-symbols-outlined text-tertiary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined text-outline text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
                <span className="ml-2 font-label-md text-label-md text-outline">(42 đánh giá)</span>
            </div>

            {/* Color Selection */}
            <div className="mt-stack-md">
                <h3 className="font-label-lg text-label-lg text-on-surface mb-3 uppercase tracking-tight">
                    Màu sắc: <span className="font-normal text-outline">Đang chọn</span>
                </h3>
                <div className="flex gap-4">
                    {colors.map((color, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveColor(color)}
                            className={`w-10 h-10 rounded-full border border-outline-variant transition-all ${activeColor === color ? 'outline outline-2 outline-primary outline-offset-2' : ''}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className="mt-stack-md">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-tight">Kích thước</h3>
                    <button className="text-primary font-label-md text-label-md underline hover:opacity-80">Hướng dẫn chọn size</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => setActiveSize(size)}
                            className={`py-3 border rounded-lg font-label-lg text-label-lg flex items-center justify-center transition-all ${activeSize === size
                                ? 'border-primary bg-primary-container text-on-primary-container font-bold'
                                : 'border-outline-variant text-on-surface hover:border-primary'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-stack-lg border-t border-outline-variant pt-6">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Chi tiết sản phẩm</h3>
                <div className="flex flex-col gap-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
                    <p>{desc}</p>
                    <ul className="flex flex-col gap-2 list-none p-0">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                            <span>Chất liệu Linen tưng cao cấp, ít nhăn và giữ form tốt.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                            <span>Thiết kế vạt ngang, cổ sơ mi truyền thống tinh tế.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                            <span>Đường may tỉ mỉ theo tiêu chuẩn xuất khẩu.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-stack-md bg-surface-container-low rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary">local_shipping</span>
                    <div>
                        <p className="font-label-lg text-label-lg text-on-surface">Miễn phí vận chuyển</p>
                        <p className="font-label-md text-label-md text-outline">Cho đơn hàng từ 500.000đ</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary">replay</span>
                    <div>
                        <p className="font-label-lg text-label-lg text-on-surface">Đổi trả trong 7 ngày</p>
                        <p className="font-label-md text-label-md text-outline">Nếu sản phẩm không vừa hoặc lỗi</p>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Action Bar (Mobile + Desktop integrated) */}
            <div className="fixed bottom-0 left-0 w-full md:relative md:mt-8 bg-surface-container-lowest md:bg-transparent p-margin-mobile md:p-0 border-t border-outline-variant md:border-none z-50 md:z-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none">
                <div className="flex gap-2 sm:gap-3 max-w-container-max mx-auto">
                    {/* Nút Chat */}
                    <button className="w-12 sm:w-14 h-12 sm:h-14 shrink-0 flex items-center justify-center border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                    </button>

                    {/* Nút Thêm vào giỏ hàng */}
                    <button
                        onClick={handleAddToCart}
                        disabled={cartStatus !== 'idle'}
                        className={`flex-1 h-12 sm:h-14 rounded-lg font-headline-md text-label-lg sm:text-headline-md flex items-center justify-center gap-1 sm:gap-2 active:scale-95 transition-all duration-300 ${cartStatus === 'success'
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary'
                            }`}
                    >
                        {cartStatus === 'idle' && (
                            <><span className="material-symbols-outlined text-[18px] sm:text-[24px]">add_shopping_cart</span> Thêm vào giỏ</>
                        )}
                        {cartStatus === 'loading' && (
                            <><span className="material-symbols-outlined animate-spin text-[18px] sm:text-[24px]">sync</span> Đang xử lý</>
                        )}
                        {cartStatus === 'success' && (
                            <><span className="material-symbols-outlined text-[18px] sm:text-[24px]">check_circle</span> Đã thêm</>
                        )}
                    </button>

                    {/* 2. NÚT MUA NGAY (Link sang /cart) */}
                    <Link
                        to="/cart"
                        className="flex-1 h-12 sm:h-14 rounded-lg bg-secondary text-on-secondary font-headline-md text-label-lg sm:text-headline-md flex items-center justify-center hover:opacity-90 active:scale-95 transition-all duration-300"
                    >
                        Mua ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}