import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext'; 
import productService from '../../services/productService'; 

export default function Cart() {
    const navigate = useNavigate();
    const { cart: cartItems, updateQuantity, removeFromCart } = useCart();
    
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [isCheckingStock, setIsCheckingStock] = useState(false);

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                const productsData = await productService.getAllProducts();
                const shuffled = productsData.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);
                const optimizedProducts = selected.map((product) => {
                    const id = product.Id || product.id || 1;
                    return {
                        ...product,
                        image: product.Image || product.image || product.ImageUrl || product.imageUrl ||
                            `https://images.unsplash.com/photo-${1500000000000 + (id * 100000)}?w=500&auto=format&fit=crop&q=60`
                    };
                });
                setRecommendedProducts(optimizedProducts);
            } catch (error) {
                console.error("Lỗi tải sản phẩm gợi ý:", error);
            }
        };
        fetchRecommendedProducts();
    }, []);

    // Kiểm tra tồn kho trước khi thanh toán
    const handleCheckout = async () => {
        setIsCheckingStock(true);
        try {
            const latestProducts = await productService.getAllProducts();
            let errorMsg = "";

            for (const item of cartItems) {
                const productInDB = latestProducts.find(p => (p.Id || p.id) === (item.id || item.Id));
                if (!productInDB || (productInDB.StockQuantity || 0) < item.quantity) {
                    errorMsg = `Sản phẩm "${item.title || item.Name}" hiện không đủ số lượng trong kho!`;
                    break;
                }
            }

            if (errorMsg) {
                alert(errorMsg);
            } else {
                navigate('/checkout');
            }
        } catch (err) {
            alert("Lỗi kết nối máy chủ, vui lòng thử lại!");
        } finally {
            setIsCheckingStock(false);
        }
    };

    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subTotal = cartItems.reduce((sum, item) => sum + ((item.price || item.Price || 0) * item.quantity), 0);
    const total = subTotal; // Có thể cộng phí ship ở đây nếu cần

    return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg">
            <div className="mb-stack-md">
                <nav className="flex items-center gap-2 text-label-md font-label-md text-outline mb-stack-sm">
                    <Link to="/" className="hover:text-primary transition-colors">Trang Chủ</Link>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface font-bold">Giỏ Hàng</span>
                </nav>
                <h1 className="font-headline-xl text-headline-xl text-on-surface">Giỏ Hàng Của Bạn</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-gutter">
                <div className="flex-grow lg:w-2/3 space-y-gutter">
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map(item => (
                                <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                            ))}
                            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-label-lg hover:underline transition-all mt-4">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Tiếp tục mua sắm
                            </Link>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant">
                            <span className="material-symbols-outlined text-[64px] text-outline mb-4">production_quantity_limits</span>
                            <h2 className="text-headline-md text-on-surface mb-2">Giỏ hàng trống</h2>
                            <Link to="/shop" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg hover:opacity-90">Mua sắm ngay</Link>
                        </div>
                    )}
                </div>

                <aside className="lg:w-1/3">
                    <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant sticky top-24">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Tóm tắt đơn hàng</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-body-lg font-body-lg text-on-surface-variant">
                                <span>Tạm tính ({totalItemsCount} sp)</span>
                                <span>{subTotal.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="pt-4 border-t border-outline-variant flex justify-between text-headline-md font-headline-md text-on-surface">
                                <span>Tổng cộng</span>
                                <span className="text-primary">{total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0 || isCheckingStock}
                            className={`w-full py-4 rounded-lg font-headline-md transition-all mb-4 flex items-center justify-center gap-2 shadow-sm ${
                                cartItems.length > 0 
                                    ? 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary' 
                                    : 'bg-surface-variant text-on-surface-variant opacity-50'
                            }`}
                        >
                            {isCheckingStock ? "Đang kiểm tra..." : "Thanh toán ngay"}
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
}