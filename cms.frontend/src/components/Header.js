import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import Context

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Lấy số lượng giỏ hàng từ Global State
    const { cartCount } = useContext(CartContext);

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
            <header className="bg-surface-container-lowest dark:bg-surface-container-highest docked full-width top-0 sticky z-50 border-b border-outline-variant dark:border-outline flat no shadows flex justify-between items-center px-margin-mobile h-16 w-full max-w-container-max mx-auto hidden md:flex">
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
                            <NavLink 
                                key={item.path} 
                                to={item.path} 
                                className={getDesktopLinkClass}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="relative w-64">
                        <input className="w-full h-10 px-4 pr-10 border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary bg-surface-bright" placeholder="Tìm kiếm sản phẩm..." type="text" />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative cursor-pointer text-primary dark:text-primary-fixed-dim">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        
                        {/* HIỂN THỊ SỐ LƯỢNG ĐỘNG TỪ CONTEXT */}
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
                    <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">VibeThread<span className="text-secondary">.Fashion</span></Link>
                </div>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">search</span>
                    <Link to="/cart" className="relative text-primary">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        
                        {/* HIỂN THỊ SỐ LƯỢNG ĐỘNG TỪ CONTEXT */}
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Navigation Drawer (Mobile) */}
            <div className={`fixed left-0 top-0 h-full w-80 z-[60] bg-surface dark:bg-inverse-surface shadow-xl flex flex-col py-stack-lg gap-stack-sm transform transition-transform duration-300 md:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-6 mb-4 flex justify-between items-center">
                    <div className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">VibeThread<span className="text-secondary">.Fashion</span></div>
                    <span className="material-symbols-outlined cursor-pointer text-on-surface-variant" onClick={() => setIsDrawerOpen(false)}>close</span>
                </div>
                <nav className="flex flex-col">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={getMobileLinkClass}
                            onClick={() => setIsDrawerOpen(false)} 
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
}