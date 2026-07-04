import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import axios from 'axios';

export default function Checkout() {
    const navigate = useNavigate();
    
    // ĐÃ THÊM: Lấy hàm clearCart ra để dọn giỏ hàng sau khi thanh toán
    const { cart, clearCart } = useCart(); 

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: ''
    });

    const [shippingMethod, setShippingMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod'); 
    const [isProcessing, setIsProcessing] = useState(false);
// Thêm đoạn này vào bên trong function Checkout()
useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            setFormData({
                fullName: user.FullName || user.fullName || '',
                phone: user.Phone || user.phone || '',
                address: user.Address || user.address || ''
            });
        } catch (e) {
            console.error("Lỗi parse user:", e);
        }
    }
}, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
const isAvailable = (productInDB, quantityRequested) => {
    // Lấy giá trị tồn kho bất chấp key là gì (Stock, stock, StockQuantity, stockQuantity)
    const stock = productInDB.StockQuantity || productInDB.stockQuantity || productInDB.Stock || productInDB.stock || 0;
    return stock >= quantityRequested;
};
    const subTotal = cart.reduce((sum, item) => sum + ((item.price || item.Price || 0) * item.quantity), 0);
    const shippingFee = shippingMethod === 'express' ? 55000 : 30000;
    const total = cart.length > 0 ? subTotal + shippingFee : 0; 

    // ĐÃ SỬA: Biến hàm này thành async để gọi API
    const handlePlaceOrder = async () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
            return;
        }

        setIsProcessing(true);
        
        try {
            // Chuẩn bị cục dữ liệu gửi xuống Backend C#
            const orderPayload = {
                // Tùy theo Model Order của bạn ở C# có các trường nào, bạn map cho khớp
                CustomerName: formData.fullName,
                Phone: formData.phone,
                Address: formData.address,
                TotalAmount: total,
                OrderDate: new Date().toISOString(),
                Status: 0, // 0: Chờ xử lý
                OrderDetails: cart.map(item => ({
                    ProductId: item.id || item.Id,
                    Quantity: item.quantity,
                    Price: item.price || item.Price
                }))
            };

            // Gọi API Checkout thực tế
            const response = await axios.post('https://localhost:7076/api/order/checkout', orderPayload);
            
            // Thành công (Đủ tồn kho)
            alert(response.data.message || "🎉 Đặt hàng thành công!");
            
            // Xóa sạch giỏ hàng
            if (clearCart) {
                clearCart(); 
            }
            
            // Chuyển về trang chủ
            navigate('/'); 

        } catch (error) {
            // THẤT BẠI: Hiển thị lỗi từ C# (Vượt quá tồn kho, hết hàng...)
            const errorMsg = error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng, vui lòng thử lại!";
            alert("Lỗi đặt hàng: " + errorMsg);
            
            // Có thể đẩy khách về lại giỏ hàng để họ giảm số lượng
            // navigate('/cart');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-background text-on-surface min-h-screen">
            <header className="bg-surface-container-lowest sticky top-0 z-50 border-b border-outline-variant h-16 flex items-center px-margin-mobile">
                <Link to="/cart" aria-label="Quay lại" className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h1 className="ml-2 font-headline-md text-headline-md text-on-surface">Thanh toán</h1>
            </header>

            <main className="max-w-md mx-auto pb-32">
                <div className="px-margin-mobile py-stack-md flex justify-between items-center bg-surface-container-low">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">1</div>
                        <span className="font-label-lg text-label-lg text-primary">Thông tin</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-outline-variant mx-4"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-outline text-outline flex items-center justify-center text-[10px] font-bold">2</div>
                        <span className="font-label-lg text-label-lg text-on-surface-variant">Hoàn tất</span>
                    </div>
                </div>

                <section className="mt-stack-md px-margin-mobile">
                    <div className="flex items-center gap-2 mb-stack-md">
                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                        <h2 className="font-headline-md text-headline-md">Thông tin giao hàng</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="relative group">
                            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Họ và tên</label>
                            <input 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all group-focus-within:scale-[1.01]" 
                                placeholder="Nguyễn Văn A" 
                                type="text"
                            />
                        </div>
                        <div className="relative group">
                            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Số điện thoại</label>
                            <input 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all group-focus-within:scale-[1.01]" 
                                placeholder="0901 234 567" 
                                type="tel"
                            />
                        </div>
                        <div className="relative group">
                            <label className="block font-label-md text-label-md text-on-surface-variant mb-1">Địa chỉ nhận hàng</label>
                            <textarea 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all group-focus-within:scale-[1.01]" 
                                placeholder="Số nhà, tên đường, phường/xã..." 
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </section>

                <section className="mt-stack-lg px-margin-mobile">
                    <h2 className="font-headline-md text-headline-md mb-stack-md">Phương thức vận chuyển</h2>
                    <div className="grid grid-cols-1 gap-3">
                        <label className={`relative flex items-center p-4 bg-surface-container-lowest border rounded-lg cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary-container/10' : 'border-outline-variant hover:border-primary'}`}>
                            <input 
                                type="radio" 
                                name="shipping" 
                                className="hidden" 
                                checked={shippingMethod === 'standard'}
                                onChange={() => setShippingMethod('standard')}
                            />
                            <div className="flex-1">
                                <p className="font-label-lg text-label-lg text-on-surface">Giao hàng tiêu chuẩn</p>
                                <p className="font-body-md text-body-md text-on-surface-variant">3-5 ngày làm việc</p>
                            </div>
                            <span className="font-label-lg text-label-lg text-primary">30.000đ</span>
                        </label>
                        
                        <label className={`relative flex items-center p-4 bg-surface-container-lowest border rounded-lg cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary-container/10' : 'border-outline-variant hover:border-primary'}`}>
                            <input 
                                type="radio" 
                                name="shipping" 
                                className="hidden" 
                                checked={shippingMethod === 'express'}
                                onChange={() => setShippingMethod('express')}
                            />
                            <div className="flex-1">
                                <p className="font-label-lg text-label-lg text-on-surface">Giao hàng hỏa tốc</p>
                                <p className="font-body-md text-body-md text-on-surface-variant">Nhận trong ngày</p>
                            </div>
                            <span className="font-label-lg text-label-lg text-primary">55.000đ</span>
                        </label>
                    </div>
                </section>

                <section className="mt-stack-lg px-margin-mobile">
                    <h2 className="font-headline-md text-headline-md mb-stack-md">Phương thức thanh toán</h2>
                    <div className="space-y-3">
                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-primary focus:ring-primary accent-primary" 
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                            />
                            <div className="ml-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-on-surface-variant">payments</span>
                                <span className="font-label-lg text-label-lg text-on-surface">Thanh toán khi nhận hàng (COD)</span>
                            </div>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-primary focus:ring-primary accent-primary" 
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                            />
                            <div className="ml-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-on-surface-variant">account_balance</span>
                                <span className="font-label-lg text-label-lg text-on-surface">Chuyển khoản ngân hàng</span>
                            </div>
                        </label>

                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                className="w-5 h-5 text-primary focus:ring-primary accent-primary" 
                                checked={paymentMethod === 'wallet'}
                                onChange={() => setPaymentMethod('wallet')}
                            />
                            <div className="ml-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-on-surface-variant">account_balance_wallet</span>
                                <span className="font-label-lg text-label-lg text-on-surface">Ví điện tử (Momo/ZaloPay)</span>
                            </div>
                        </label>
                    </div>
                </section>

                <section className="mt-stack-lg px-margin-mobile bg-surface-container-low py-stack-md border-y border-outline-variant">
                    <h2 className="font-headline-md text-headline-md mb-4">Tóm tắt đơn hàng</h2>
                    
                    <div className="space-y-4 mb-6">
                        {cart.length === 0 ? (
                            <p className="text-on-surface-variant text-center py-4">Bạn chưa chọn sản phẩm nào.</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-surface-container-lowest border border-outline-variant rounded overflow-hidden flex-shrink-0">
                                        <img className="w-full h-full object-cover" src={item.image} alt={item.title || item.Name} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-label-lg text-label-lg truncate text-on-surface">{item.title || item.Name}</p>
                                        <p className="font-body-md text-body-md text-on-surface-variant">Số lượng: {item.quantity} • Size: {item.size}</p>
                                    </div>
                                    <p className="font-la   bel-lg text-label-lg text-on-surface">{(item.price || item.Price || 0).toLocaleString('vi-VN')}đ</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-2 border-t border-outline-variant pt-4">
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span className="font-body-md text-body-md">Tạm tính</span>
                            <span className="font-body-md text-body-md">{subTotal.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex justify-between items-center text-on-surface-variant">
                            <span className="font-body-md text-body-md">Phí vận chuyển</span>
                            <span className="font-body-md text-body-md">{cart.length > 0 ? shippingFee.toLocaleString('vi-VN') : '0'}đ</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-headline-md text-headline-md text-on-surface">Tổng cộng</span>
                            <span className="font-headline-lg text-headline-lg text-primary font-bold">{total.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </section>
            </main>

            <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-4 z-50">
                <div className="max-w-md mx-auto">
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing || cart.length === 0}
                        className={`w-full text-white font-label-lg text-label-lg h-14 rounded-lg flex items-center justify-center gap-2 transition-all ${
                            isProcessing || cart.length === 0 
                                ? 'bg-outline opacity-80 cursor-not-allowed' 
                                : 'bg-[#2C9FAF] active:scale-95 shadow-lg shadow-primary-container/20 hover:bg-[#258d9b]'
                        }`}
                    >
                        {isProcessing ? (
                            <><span className="material-symbols-outlined animate-spin">sync</span> Đang xử lý...</>
                        ) : (
                            <><span className="material-symbols-outlined">lock</span> Đặt hàng ngay</>
                        )}
                    </button>
                    <p className="text-center font-label-md text-label-md text-on-surface-variant mt-2">
                        Thông tin thanh toán của bạn được bảo mật tuyệt đối.
                    </p>
                </div>
            </div>
        </div>
    );
}