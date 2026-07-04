// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Trạng thái chuyển đổi giữa Login và Register
    const [isLoading, setIsLoading] = useState(false);

    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                // XỬ LÝ ĐĂNG NHẬP
                const res = await authService.login(formData.email, formData.password);
                alert(res.message);

                // Lưu thông tin user vào localStorage để dùng cho toàn trang web
                localStorage.setItem('user', JSON.stringify(res.user));

                // Đăng nhập xong đẩy về trang chủ hoặc giỏ hàng
                navigate('/');
            } else {
                // XỬ LÝ ĐĂNG KÝ
                const res = await authService.register({
                    FullName: formData.fullName,
                    Email: formData.email,
                    Password: formData.password,
                    Phone: formData.phone,
                    Address: formData.address
                });
                alert(res.message);

                // Đăng ký xong tự động chuyển sang form Đăng nhập
                setIsLogin(true);
                setFormData({ ...formData, password: '' });
            }
        } catch (error) {
            // Bắt lỗi từ BadRequest của Backend
            const errorMsg = error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
            alert("Lỗi: " + errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-outline-variant">

                <div className="text-center mb-8">
                    <h1 className="text-headline-lg font-headline-lg text-primary mb-2">
                        {isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản Mới'}
                    </h1>
                    <p className="text-body-md text-on-surface-variant">
                        {isLogin ? 'Chào mừng bạn trở lại với hệ thống' : 'Điền thông tin bên dưới để đăng ký'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Các trường chỉ hiện khi Đăng ký */}
                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-label-md mb-1 text-on-surface">Họ và tên *</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                                    className="w-full border border-outline px-4 py-2 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-label-md mb-1 text-on-surface">Số điện thoại</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                        className="w-full border border-outline px-4 py-2 rounded-lg focus:border-primary focus:ring-1 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-label-md mb-1 text-on-surface">Địa chỉ</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                                    className="w-full border border-outline px-4 py-2 rounded-lg focus:border-primary focus:ring-1 outline-none" />
                            </div>
                        </>
                    )}

                    {/* Các trường dùng chung (Email & Password) */}
                    <div>
                        <label className="block text-label-md mb-1 text-on-surface">Email *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                            className="w-full border border-outline px-4 py-2 rounded-lg focus:border-primary focus:ring-1 outline-none" />
                    </div>
                    <div>
                        <label className="block text-label-md mb-1 text-on-surface">Mật khẩu *</label>
                        <input required type="password" name="password" value={formData.password} onChange={handleInputChange}
                            className="w-full border border-outline px-4 py-2 rounded-lg focus:border-primary focus:ring-1 outline-none" />
                    </div>

                    <button disabled={isLoading} type="submit"
                        className="w-full bg-primary text-white font-label-lg py-3 rounded-lg hover:bg-opacity-90 transition-all mt-6">
                        {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập' : 'Đăng Ký')}
                    </button>
                </form>

                {/* Nút chuyển đổi qua lại giữa 2 form */}
                <div className="mt-6 text-center text-body-md">
                    <span className="text-on-surface-variant">
                        {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                    </span>
                    <button type="button" onClick={() => setIsLogin(!isLogin)}
                        className="text-primary font-bold hover:underline">
                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                    </button>
                </div>

            </div>
        </main>
    );
}