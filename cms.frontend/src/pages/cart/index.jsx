import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import ProductCard from '../../components/ProductCard';

export default function Cart() {
    const navigate = useNavigate();

    // Dữ liệu giỏ hàng giả lập ban đầu
    const [cartItems, setCartItems] = useState([
        { id: 1, category: "Áo Sơ Mi", title: "Áo Linen Cổ Tàu Cao Cấp", size: "L", color: "Teal Marine", price: 850000, quantity: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsa13mJcRAgB8qOLSZ2Qes893BXRnqRF17FapFGzPlqB78uqke8Hire6CRvAOg_Fw3LCPIYovZ2vn2Rs2JCv4JznvUHaVnX_9ZbPOcLncc6XRh8rc_BNB1N9MrcSp7qUjc0ymOlf54KesO0qE3ZG-DF2DtO_9xDUbhCkrWJyzxugUS6uBRBxLmlV5ZJg-obu2W5s18FyMV03MvZbUjPHAK6soV4bnWg9GOZ_0tacgJ-LS3N-G9PbS_plI98jDlgBGmf7dqdaU9Aj_V" },
        { id: 2, category: "Quần Âu", title: "Quần Tây Slimfit Charcoal", size: "32", color: "Xám Đậm", price: 1200000, quantity: 2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaXA6BvaKJUH5tHUmB4Dtsznk2Jc7L4EWfQTcPxjzuKhmdKg_N_z0x9UlzCVu-XkK-wbxQpJiezFZDWVC1axpi2Z3xpOZ4jT65Bv-kmoKIVxtpYP-Dwcn1epesu50hqGqmRttlJCxqRSu_ayDvq6SLtWHqkZ8XFfKEJdMbWd_4vdL3OMNy1KiK9ENBc5undMvV-WSUbcaCeDzxRQhS8blRMUCffMagfZtiJRH2SH_RzAfdND_ZGXhGumEJnkwrx9LkpmN2-OZufQEd" }
    ]);

    // Dữ liệu Gợi ý mua sắm (Có thể tái sử dụng component ProductCard)
    const recommendedProducts = [
        { id: 5, title: "Thắt Lưng Da Bò Ý", price: 1450000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6Cmr2C4iR4Rz3yD766vY_Bg26sfbvBqk1r7DJAwEuQWcFr7lf3KMWycxWVEPdQVSfOkCRNuSa4gpFQw1rhJEqYolL1GsVfoIMAsW1kALbOQpZh9XloszM7cSV8ODJ4uauiM92qZdF0thSdUrkKyzXp8Igp5te7JV9YrU_vOGdzOuEAfFUq22Btthp2924S6KsZCcgix2fMpVJhyPYXAqnK1mUrN-8ElpfvWovvV7vTq8C5DEvH7c--BPSaA2nE6nxfJbeBVs0_mfC", isAvailable: true },
        { id: 6, title: "Giày Loafers Suede", price: 2200000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqpE80YszF7Vgatf-COVArAVPoc1G4k_KyRQfTYZZiD-rnwEWzr3AyzNdvWnK80Ttgwag08oh9Gx-ulOBr80yY88yYWedq1EZnNE9hLCj-nNbW0KlzmF-egfkY1fTlqhwlbFKllCL-CE_cqBD9BHTwJpPOJ8DuuQdLVUQ3dW_T-Ws-xvQQknFtKmHzXGsN_ylOmlcx2DtG5lfKVLNtBsgXIRgv0l877Iu2JBVQk3oLbfJsM_AuDtHbQ3coLQ93CXtIt0g8gh9C4G4o", isAvailable: true },
        { id: 7, title: "Cà Vạt Lụa Tự Nhiên", price: 650000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoBhekZnRH80_FLa8w0RuTuE5vwip69hoKtWCcDWeqpwj3UwLGhIm2YeG0M0V0pzbsRv0WIlczCzINJK5HQDpTZsyxO08IC10rAC_1EpavkQ8KrGqjTRsEZUaVJ8mF5gijf6oCK1ZXgJ_2TfHJH5TmTWEN5h09-PexcoQmk9ieihvCehQ_MjpxUKydZMZt6V6Y9AsA_bIlBX7HKINXw6RXtgo7hSFY1xXJpgaJFfEqgjpOJpR6QJtlHJaMQO_GNC3qN3j38tEYT8Wq", isAvailable: true },
        { id: 8, title: "Áo Polo Pima Cotton", price: 950000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW3lcDj0j7_LEzB0l3ojy5TvUarX4JHnbzT-kd4Ppc_uRz6gfX_F3qe2pL9FMqPnLGlIfWzI4kfNXR2bnv2i6WxKaLM0CqJFITX8RN4ei5dW9ESdhPn-eOsK0MNl3KcxGlOiB3aAo25qzTujzUFhZN18usgcuIOujBvubsuOIS42Fyp0vYquSYDpRZIcaznX9YBQ1zlT6G7zwj2qZpTUhbRCogUErAkWxIG_j2TJShGjRtwViobNMTjSJq_9CPgwZWrze5y5Myk5Ke", isAvailable: true }
    ];

    // Xử lý thay đổi số lượng
    const handleUpdateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    // Xử lý xóa món hàng
    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // Tính toán hóa đơn
    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 0;
    const total = subTotal - discount;

    return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg">
            
            {/* Breadcrumb & Title */}
            <div className="mb-stack-md">
                <nav className="flex items-center gap-2 text-label-md font-label-md text-outline mb-stack-sm">
                    <Link to="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface font-bold">Giỏ Hàng</span>
                </nav>
                <h1 className="font-headline-xl text-headline-xl text-on-surface">Giỏ Hàng Của Bạn</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-gutter">
                
                {/* Left Column: Item List */}
                <div className="flex-grow lg:w-2/3 space-y-gutter">
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onUpdateQuantity={handleUpdateQuantity} 
                                    onRemove={handleRemove} 
                                />
                            ))}
                            
                            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-label-lg hover:underline transition-all mt-4">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Tiếp tục mua sắm
                            </Link>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant">
                            <span className="material-symbols-outlined text-[64px] text-outline mb-4">production_quantity_limits</span>
                            <h2 className="text-headline-md text-on-surface mb-2">Giỏ hàng trống</h2>
                            <p className="text-on-surface-variant mb-6">Hãy lấp đầy giỏ hàng bằng những bộ trang phục thời thượng nhất nhé.</p>
                            <Link to="/shop" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg hover:opacity-90">
                                Mua sắm ngay
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <aside className="lg:w-1/3">
                    <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant sticky top-24">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Tóm tắt đơn hàng</h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-body-lg font-body-lg text-on-surface-variant">
                                <span>Tạm tính ({totalItemsCount} sản phẩm)</span>
                                <span>{subTotal.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between text-body-lg font-body-lg text-on-surface-variant">
                                <span>Phí vận chuyển</span>
                                <span className="text-primary font-bold">Miễn phí</span>
                            </div>
                            <div className="flex justify-between text-body-lg font-body-lg text-on-surface-variant">
                                <span>Mã giảm giá</span>
                                <span className="text-tertiary">-{discount}đ</span>
                            </div>
                            <div className="pt-4 border-t border-outline-variant flex justify-between text-headline-md font-headline-md text-on-surface">
                                <span>Tổng cộng</span>
                                <span className="text-primary">{total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        {/* Coupon Input */}
                        <div className="mb-6">
                            <label className="block font-label-md text-label-md text-outline mb-2">Mã giảm giá</label>
                            <div className="flex gap-2">
                                <input className="flex-grow border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none px-4 py-2 text-body-md bg-transparent" placeholder="Nhập mã..." type="text" />
                                <button className="bg-secondary px-4 py-2 text-white font-label-lg rounded-lg hover:bg-[#1a4463] transition-colors">Áp dụng</button>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button 
                            onClick={() => navigate('/checkout')}
                            disabled={cartItems.length === 0}
                            className={`w-full py-4 rounded-lg font-headline-md transition-all mb-4 flex items-center justify-center gap-2 shadow-sm ${
                                cartItems.length > 0 
                                    ? 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary active:scale-[0.98]' 
                                    : 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed'
                            }`}
                        >
                            <span>Thanh toán ngay</span>
                            <span className="material-symbols-outlined">trending_flat</span>
                        </button>
                        
                        <div className="flex flex-col gap-3">
                            <p className="text-[12px] text-outline text-center">Chúng tôi chấp nhận các hình thức thanh toán:</p>
                            <div className="flex justify-center gap-4 opacity-60">
                                <span className="material-symbols-outlined text-[24px]">payments</span>
                                <span className="material-symbols-outlined text-[24px]">credit_card</span>
                                <span className="material-symbols-outlined text-[24px]">account_balance</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Recommendations Section */}
            <section className="mt-stack-lg border-t border-outline-variant pt-stack-lg">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-gutter">Có thể bạn sẽ thích</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                    {/* Tái sử dụng component ProductCard thay vì viết lại thẻ mới */}
                    {recommendedProducts.map(prod => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </section>
        </main>
    );
}