import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // THÊM STATE ĐỂ LƯU TỪ KHÓA TÌM KIẾM
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate(); 
    const { cart } = useCart();
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        setUser(null); 
        navigate('/'); 
        window.location.reload(); 
    };

    // HÀM XỬ LÝ TÌM KIẾM
    const handleSearch = (e) => {
        // Bấm Enter hoặc click icon search
        if ((e.key === 'Enter' || e.type === 'click') && searchTerm.trim() !== '') {
            // Chuyển hướng sang trang search kèm từ khóa
            navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); // Xóa trắng ô input sau khi search
            setIsDrawerOpen(false); // Đóng menu mobile nếu đang mở
        }
    };

    const menuItems = [
        { path: "/", label: "Trang Chủ", icon: "home" },
        { path: "/shop", label: "Cửa Hàng", icon: "shopping_bag" },
        { path: "/blog", label: "Tin Tức / Blog", icon: "newspaper" },
        { path: "/about", label: "Về Chúng Tôi", icon: "info" } 
    ];

    const getDesktopLinkClass = ({ isActive }) => {
        const baseClass = "pb-1 font-label-lg text-label-lg transition-all duration-200 cursor-pointer active:opacity-80";
        return isActive 
            ? `${baseClass} text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim font-bold`
            : `${baseClass} text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim border-b-2 border-transparent`;
    };

    const getMobileLinkClass = ({ isActive }) => {
        const baseClass = "flex items-center gap-3 px-6 py-3 mx-2 rounded-r-full transition-colors font-body-md text-body-md";
        return isActive
            ? `${baseClass} bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary font-bold`
            : `${baseClass} text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high`;
    };

    return (
        <>
            {/* Desktop Header */}
            <header className="bg-surface-container-lowest dark:bg-surface-container-highest docked full-width top-0 sticky z-50 border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile h-16 w-full max-w-container-max mx-auto hidden md:flex">
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim cursor-pointer"
                        onClick={() => setIsDrawerOpen(true)}>menu</span>
                    <Link to="/" className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-primary dark:text-primary-fixed-dim">
                        Long<span className="text-secondary">.Fashion</span>
                    </Link>
                </div>
                
                <div className="hidden lg:flex items-center gap-8">
                    <nav className="flex gap-6 items-center">
                        {menuItems.map((item) => (
                            <NavLink key={item.path} to={item.path} className={getDesktopLinkClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    
                    {/* KHU VỰC Ô TÌM KIẾM DESKTOP */}
                    <div className="relative w-64">
                        <input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full h-10 px-4 pr-10 border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary bg-surface-bright" 
                            placeholder="Tìm kiếm sản phẩm..." 
                            type="text" 
                        />
                        <span 
                            onClick={handleSearch}
                            className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer hover:text-primary transition-colors"
                        >
                            search
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="relative group cursor-pointer flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[24px]">account_circle</span>
                            <span className="font-label-md hidden lg:block max-w-[120px] truncate">
                                Chào, {user.FullName || user.fullName || "Khách"}
                            </span>
                            <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-outline-variant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                <div className="block px-4 py-3 text-body-md text-on-surface font-bold border-b border-outline-variant bg-surface-container-lowest">
                                    Tài khoản của tôi
                                </div>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-surface-container hover:text-error transition-colors text-body-md text-error font-bold">
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors group">
                            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">person</span>
                            <span className="font-label-md hidden lg:block">Đăng nhập</span>
                        </Link>
                    )}

                    <Link to="/cart" className="relative cursor-pointer text-primary dark:text-primary-fixed-dim">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="bg-surface-container-lowest sticky top-0 z-40 border-b border-outline-variant flex items-center justify-between px-4 h-14 md:hidden">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary cursor-pointer" onClick={() => setIsDrawerOpen(true)}>menu</span>
                    <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">Long<span className="text-secondary">.Fashion</span></Link>
                </div>
                <div className="flex items-center gap-4">
                    {/* Bấm icon search trên mobile mở menu để search */}
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer" onClick={() => setIsDrawerOpen(true)}>search</span>
                    
                    {!user && (
                        <Link to="/login" className="text-on-surface-variant hover:text-primary">
                            <span className="material-symbols-outlined">person</span>
                        </Link>
                    )}

                    <Link to="/cart" className="relative text-primary">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`fixed left-0 top-0 h-full w-80 z-[60] bg-surface dark:bg-inverse-surface shadow-xl flex flex-col py-stack-lg gap-stack-sm transform transition-transform duration-300 md:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-6 mb-4 flex justify-between items-center">
                    <div className="font-headline-lg text-headline-lg font-bold text-primary">Long.Fashion</div>
                    <span className="material-symbols-outlined cursor-pointer text-on-surface-variant" onClick={() => setIsDrawerOpen(false)}>close</span>
                </div>
                
                {/* KHU VỰC Ô TÌM KIẾM MOBILE */}
                <div className="px-4 mb-4">
                    <div className="relative w-full">
                        <input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full h-12 px-4 pr-10 border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary bg-surface-bright" 
                            placeholder="Tìm sản phẩm..." 
                            type="text" 
                        />
                        <span 
                            onClick={handleSearch}
                            className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                        >
                            search
                        </span>
                    </div>
                </div>

                <nav className="flex flex-col flex-grow">
                    {menuItems.map((item) => (
                        <NavLink key={item.path} to={item.path} className={getMobileLinkClass} onClick={() => setIsDrawerOpen(false)}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto px-2 pt-4 border-t border-outline-variant">
                    {user ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 px-6 py-2">
                                <span className="material-symbols-outlined text-primary">account_circle</span>
                                <span className="font-bold text-body-md text-on-surface">Chào, {user.FullName || user.fullName || "Khách"}</span>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 rounded-r-full text-error hover:bg-surface-container font-body-md text-left transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-3 px-6 py-3 rounded-r-full text-primary font-bold hover:bg-surface-container font-body-md transition-colors">
                            <span className="material-symbols-outlined">login</span>
                            <span>Đăng nhập / Đăng ký</span>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}