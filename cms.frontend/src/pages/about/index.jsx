import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg">

            {/* 1. HERO BANNER - GIỚI THIỆU CHUNG */}
            <section className="mb-section-padding">
                <div className="relative overflow-hidden rounded-xl bg-surface-container h-[300px] md:h-[400px] flex items-center justify-center text-center px-4">
                    <div className="absolute inset-0 z-0">
                        <div
                            className="w-full h-full bg-cover bg-center opacity-40 filter grayscale"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTjC5O_285QAtaClzdiJ7_4FAMseXZjxc52rAga5wgI_rQJXWhJnmLjwzaWWHz_Ebefx9A4SFuW-6LZsYlLs7bwVsYOR2V8EAUPn5eahLbdk6Mf3ngkPgbithwasd36lghIMpEaAp7OMzE3Z7vyqiz0nXwnZwxqmzuyiRUGdVN-N58NU4doflahGE-q5JKLwos4mnvB7z5TXjLqeulrqJhYTz5CqiUxAYaGqITCe6MAoBticcmr3Kmz_c5_W08cn2f2v5PnlpRyG3Q')" }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50"></div>
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <span className="bg-primary text-on-primary px-3 py-1 text-label-lg font-label-lg mb-4 inline-block tracking-wider rounded-sm">
                            CÂU CHUYỆN THƯƠNG HIỆU
                        </span>
                        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4 leading-tight">
                            Định Hình Phong Cách Thời Trang Tối Giản & Bền Vững
                        </h1>
                        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto">
                            Chào mừng bạn đến với VibeThread. Chúng tôi kiến tạo nên những trang phục cao cấp mang hơi thở hiện đại, giúp bạn tự tin tỏa sáng từ văn phòng ra phố thị.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. GIÁ TRỊ CỐT LÕI (CORE VALUES) */}
            <section className="mb-section-padding">
                <div className="text-center mb-stack-lg">
                    <h2 className="font-headline-xl text-headline-xl text-primary font-bold uppercase mb-2">
                        Giá Trị Cốt Lõi
                    </h2>
                    <div className="w-16 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    {/* Giá trị 1 */}
                    <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl flex flex-col items-center text-center shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[40px] mb-4">
                            workspace_premium
                        </span>
                        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">Chất Lượng Premium</h3>
                        <p className="text-body-md text-on-surface-variant leading-relaxed">
                            Từng sợi lụa satin, cotton linen nhập khẩu đều được đội ngũ chuyên gia kiểm định nghiêm ngặt trước khi đưa vào cắt may.
                        </p>
                    </div>

                    {/* Giá trị 2 */}
                    <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl flex flex-col items-center text-center shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[40px] mb-4">
                            eco
                        </span>
                        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">Thời Trang Bền Vững</h3>
                        <p className="text-body-md text-on-surface-variant leading-relaxed">
                            Không chạy theo xu hướng mì ăn liền, VibeThread tập trung vào phom dáng tối giản với độ bền vượt thời gian, bảo vệ môi trường sinh thái.
                        </p>
                    </div>

                    {/* Giá trị 3 */}
                    <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl flex flex-col items-center text-center shadow-sm">
                        <span className="material-symbols-outlined text-primary text-[40px] mb-4">
                            palette
                        </span>
                        <h3 className="font-headline-md text-headline-md mb-2 text-on-surface">Bản Sắc Thiết Kế</h3>
                        <p className="text-body-md text-on-surface-variant leading-relaxed">
                            Sự giao thoa hoàn hảo giữa kỹ thuật may đo phương Tây hiện đại và nét thanh lịch tinh tế của văn hóa công sở Á Đông.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. ĐĂNG KÝ NHẬN ƯU ĐÃI (NEWSLETTER) */}
            <section className="bg-secondary-container rounded-xl p-10 md:p-16 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary text-[48px] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mail
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-secondary-container mb-2">
                    Đồng hành cùng cộng đồng VibeThread
                </h2>
                <p className="text-body-lg font-body-lg text-on-secondary-container/80 mb-8 max-w-xl">
                    Đăng ký để nhận sớm nhất thông tin về các bộ sưu tập giới hạn độc quyền và mẹo phối đồ đỉnh cao hàng tuần từ các stylist hàng đầu.
                </p>
                <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="flex-grow px-6 py-4 rounded-lg bg-surface-container-lowest border-none text-body-md focus:ring-2 focus:ring-primary"
                        placeholder="Địa chỉ email của bạn"
                        required
                        type="email"
                    />
                    <button
                        className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-container transition-all active:opacity-90 whitespace-nowrap"
                        type="submit"
                    >
                        ĐĂNG KÝ NGAY
                    </button>
                </form>
            </section>

        </main>
    );
}