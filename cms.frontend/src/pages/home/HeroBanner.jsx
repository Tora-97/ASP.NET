import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
    return (
        <section className="relative w-full mb-stack-lg rounded-2xl overflow-hidden bg-surface-container h-[400px] md:h-[500px] lg:h-[600px] flex items-center group">
            
            {/* Lớp nền: Hình ảnh và Gradient */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    // Bạn có thể thay đổi link ảnh dưới đây thành ảnh bộ sưu tập thật của bạn
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTjC5O_285QAtaClzdiJ7_4FAMseXZjxc52rAga5wgI_rQJXWhJnmLjwzaWWHz_Ebefx9A4SFuW-6LZsYlLs7bwVsYOR2V8EAUPn5eahLbdk6Mf3ngkPgbithwasd36lghIMpEaAp7OMzE3Z7vyqiz0nXwnZwxqmzuyiRUGdVN-N58NU4doflahGE-q5JKLwos4mnvB7z5TXjLqeulrqJhYTz5CqiUxAYaGqITCe6MAoBticcmr3Kmz_c5_W08cn2f2v5PnlpRyG3Q')" }} 
                ></div>
                {/* Lớp mờ (Gradient) giúp chữ màu trắng hiển thị rõ ràng trên nền ảnh phức tạp */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Lớp nội dung: Chữ và Nút bấm */}
            <div className="relative z-10 px-8 md:px-16 max-w-3xl text-white">
                <span className="inline-block py-1 px-3 rounded-sm bg-primary/90 text-white font-label-md tracking-wider uppercase mb-4 backdrop-blur-sm shadow-sm">
                    Bộ Sưu Tập Mới
                </span>
                
                <h1 className="font-headline-xl text-[36px] md:text-[56px] font-bold leading-tight mb-4 text-white">
                    Khởi Nguồn <br className="hidden md:block" /> Phong Cách Tối Giản
                </h1>
                
                <p className="font-body-lg text-body-lg opacity-90 mb-8 max-w-lg leading-relaxed text-white/90">
                    Khám phá những thiết kế thanh lịch, chất liệu bền vững từ VibeThread. Tôn vinh khí chất hiện đại của bạn trong mọi khoảnh khắc.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        to="/shop" 
                        className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        Khám phá ngay <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
            
        </section>
    );
}