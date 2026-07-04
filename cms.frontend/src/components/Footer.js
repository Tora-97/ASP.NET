import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className="bg-inverse-surface dark:bg-surface-container-lowest w-full mt-stack-lg flex flex-col md:flex-row justify-between p-margin-mobile md:px-section-padding max-w-container-max mx-auto gap-stack-md text-surface-variant dark:text-on-surface-variant">
                <div className="flex flex-col gap-8 md:flex-row w-full justify-between pb-8 border-b border-surface-variant/20">
                    {/* Brand Info */}
                    <div className="w-full md:w-1/3">
                        <div className="font-headline-md text-headline-md font-bold text-primary-fixed dark:text-primary mb-4">
                            VibeThread<span className="text-secondary-fixed">.Fashion</span>
                        </div>
                        <p className="font-body-md text-body-md text-surface-variant/80">
                            Hệ thống thời trang cao cấp dẫn đầu xu hướng. Chúng tôi cam kết mang đến những sản phẩm premium chất lượng cao, định hình phong cách thời thượng cho bạn.
                        </p>
                    </div>
                    {/* Policies */}
                    <div className="w-full md:w-1/4">
                        <h4 className="font-headline-md text-[16px] font-bold text-on-secondary mb-4 uppercase">CHÍNH SÁCH</h4>
                        <ul className="flex flex-col gap-2 font-body-md text-body-md">
                            <li><a className="hover:text-primary-fixed dark:hover:text-primary transition-colors flex items-center gap-1" href="#"><span className="material-symbols-outlined text-[14px]">chevron_right</span> Chính sách giao hàng</a></li>
                            <li><a className="hover:text-primary-fixed dark:hover:text-primary transition-colors flex items-center gap-1" href="#"><span className="material-symbols-outlined text-[14px]">chevron_right</span> Chính sách đổi trả 1-1</a></li>
                            <li><a className="hover:text-primary-fixed dark:hover:text-primary transition-colors flex items-center gap-1" href="#"><span className="material-symbols-outlined text-[14px]">chevron_right</span> Bảo mật thông tin</a></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="w-full md:w-1/3">
                        <h4 className="font-headline-md text-[16px] font-bold text-on-secondary mb-4 uppercase">LIÊN HỆ</h4>
                        <ul className="flex flex-col gap-3 font-body-md text-body-md">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary-fixed mt-0.5">location_on</span>
                                <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary-fixed">call</span>
                                <span>Hotline: 090x.xxx.xxx</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary-fixed">mail</span>
                                <span>long@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center pt-4 font-label-md text-label-md text-surface-variant/60">
                    © 2026 Long.Fashion. All Rights Reserved.
                </div>
            </footer>

            {/* BottomNavBar (Mobile Only) */}
            <nav className="bg-surface dark:bg-inverse-surface fixed bottom-0 w-full z-50 border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center py-2 md:hidden">
                <a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim font-bold scale-95 w-1/4" href="#">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="font-label-md text-[10px] mt-1">Trang Chủ</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant transition-colors rounded-lg py-1 w-1/4" href="#">
                    <span className="material-symbols-outlined">storefront</span>
                    <span className="font-label-md text-[10px] mt-1">Cửa Hàng</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant transition-colors rounded-lg py-1 w-1/4" href="#">
                    <span className="material-symbols-outlined">article</span>
                    <span className="font-label-md text-[10px] mt-1">Tin Tức</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant transition-colors rounded-lg py-1 w-1/4" href="#">
                    <span className="material-symbols-outlined">person</span>
                    <span className="font-label-md text-[10px] mt-1">Cá Nhân</span>
                </a>
            </nav>
        </>
    );
}