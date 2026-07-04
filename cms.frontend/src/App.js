import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // <--- ĐÃ THÊM 'Link' VÀO ĐÂY

// IMPORT PROVIDER ĐỂ QUẢN LÝ SỐ LƯỢNG GIỎ HÀNG TOÀN CỤC
import { CartProvider } from './context/CartContext';

// 1. IMPORT LAYOUT CHUNG (HEADER & FOOTER)
import Header from './components/Header';
import Footer from './components/Footer';

// 2. IMPORT TẤT CẢ CÁC TRANG CHỨC NĂNG THẬT
import Home from './pages/home/index';
import Shop from './pages/shop/index';
import Blog from './pages/blog/index';
import BlogDetail from './pages/blog/BlogDetail';
import About from './pages/about/index';
import ProductDetail from './pages/product-detail/index';
import Cart from './pages/cart/index';
import Checkout from './pages/checkout/index';
import Login from './pages/auth/Login';
import Search from './pages/search';
function App() {
    return (
        // BỌC CARTPROVIDER RA NGOÀI CÙNG ĐỂ HEADER VÀ CÁC TRANG ĐỀU DÙNG ĐƯỢC DATA
        <CartProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-surface">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/about" element={<About />} />

                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogDetail />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={
                                <div className="text-center py-16">
                                    <h2 className="text-headline-lg font-bold text-tertiary">404 - KHÔNG TÌM THẤY TRANG</h2>
                                    <Link to="/" className="inline-block bg-primary text-on-primary px-4 py-2 rounded mt-4">
                                        Quay lại Trang Chủ
                                    </Link>
                                </div>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;