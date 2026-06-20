import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link ở đây
import PostCard from '../../components/PostCard';
import BlogSidebar from './BlogSideBar';

// Mock data giữ nguyên
const mockAllBlogs = [
    { id: 1, category: "Phối đồ", title: "5 cách phối đồ với Blazer cho môi trường công sở hiện đại", date: "8 Tháng 6, 2026", excerpt: "Blazer không còn là món đồ khô khan. Hãy cùng VibeThread khám phá cách biến tấu chiếc áo khoác này để trở nên quyền lực và thời thượng hơn.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkdv9hZaNpROx7bH8Za2n9XpsBnPatI_mNiG6ybSlgSS2hMVE46oP_FJgwC-Ij0Byx0V3Q9ZRufyVUcTfuDfWX7nudSII98a1GOWx982h6TPorz78TmLD--v3x6B4dfciq7jQdKIEoYDvxIxU8rQQs2QjWUR_WVjlszVKYtxjEKpdvWF3k696KijW8-Jr1F3IeOi1tMp1Xhl8ZtRtm213yHtFWdaeDsfdmLdOKRvelPgl28LUPtWCo34fduJC8YsTchfQ1qQ8irCdP" },
    { id: 2, category: "Sự kiện", title: "VibeThread trình làng bộ sưu tập 'Bản Sắc Việt' tại Fashion Week", date: "5 Tháng 6, 2026", excerpt: "Màn trình diễn đầy ấn tượng kết hợp giữa lụa truyền thống và phom dáng hiện đại đã thu hút mọi ánh nhìn của giới mộ điệu.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl5T431LSPI0jEtLgjAg2MzBm7kwWiZhpwlvKkCw98UjlV_hSQy5XD4Yeuy0EVhYxvVwFR4BhxDhmcSQ3YBrLQ143z_WsV_6aGo7L_fx2JEPAP0LW-BPapoRt8-HY-Xy3131XTNq9TsE2k0HT05RlvjH0sThcNDeAbwza8WJHcgkaTL25J1zabMY5JTcgcEmtwuY48tY2t0bnCGGIiY33eCsxdhd9FE7T5uzAS7JUuTSMIFe2M9oCcKfaRdF8eIjJSqCUWxXIs7kos" },
    { id: 3, category: "Xu hướng", title: "Sự trỗi dậy của chất liệu bền vững trong ngành may mặc", date: "2 Tháng 6, 2026", excerpt: "Tại sao các thương hiệu lớn đang chuyển hướng sang sử dụng sợi dứa và da thuần chay? Cùng tìm hiểu tương lai của ngành công nghiệp tỷ đô.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHiVJdl7ZuVAasLAkWcCD_D95cNJCqtA5nLrGGD_q6Q_Ys8ZoAwGj_O0DrNH12ItHDZG5Ir9oY1YJAQTrm27tgR-X5mGn6rtlGFeo7S_W-xiEx-cXnsRZbCaPvgCTny0dCF9wRr3oWyFg6foJtfZfErsk-IqiHFouzQChXtAaI5AXY7AkeWt8Yz8J7awxsl8CQdEGBYvy0K2NB_We9HMzS9rLj73JxuTFYQ3RQ1lF-dxX033QgmOrT0tlkii0Q49mdWinEk5dMcbGS" },
    { id: 4, category: "Xu hướng", title: "Quiet Luxury: Khi đẳng cấp không cần lên tiếng", date: "28 Tháng 5, 2026", excerpt: "Xu hướng 'xa xỉ thầm lặng' đang thống trị các sàn diễn. Làm thế nào để mặc đẹp mà không cần khoe logo?", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRbp6KQ_KSjJSBd1tdP2AFGYy00_KZpSKS4EqKqJ2YeIvOhwdR3eWpQXKGmGiLBD-LU5SBz-8DbIxJq5P35rcNyZLXuPjBAizwcvRUVg_BDtN22J3eY7JmS20QE6G6nQ4LHTjz-9XWJsJGb29Mu5eunxnzku_9X-uK_7jTw6eAK2OvKI9ka22zzuM9lBCYohSCAgnjaO6gOHzPHIN8bNaArInZiZ5VE59jymHRwC4w3L1yvjPXVNASUkwDfcMxP765g18qAVVyEisS" },
    { id: 5, category: "Phối đồ", title: "Phối màu Ton-sur-Ton: Bí quyết cho vẻ ngoài thời thượng", date: "25 Tháng 5, 2026", excerpt: "Tận dụng những gam màu cùng tông để tạo nên sự thống nhất và chiều sâu cho bộ trang phục của bạn.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdIpUyQQGkqYm4cp_vtT-Pa4SuUUPQbrPJII4-BPLhJVJ9yUWzXfiRe1N9N0Dk-WvObFJRpSgSHvWMLh8t9mgZDgOPRdTQTSYB4SsGAvN2oKIeXghId0ZQ8lHki4vTRQDwLucJokVI-JtigK3hA92L5xHiJ3iDbQqQKn5_Jl4nfyGgiUcmtLGyz7Ud3_GEZRp0aAoBHcHCCs9Wpw-giCaVxK2EYDy-mdHcB-dvVt2SbhdFw8sufLARr4q-0lWNBkVbp1MaFOtQ4UtJ" },
    { id: 6, category: "Sự kiện", title: "Hành trình từ ý tưởng đến sàn diễn: Sau cánh cửa VibeThread", date: "20 Tháng 5, 2026", excerpt: "Khám phá quy trình sáng tạo nghiêm ngặt và đam mê đằng sau mỗi thiết kế của đội ngũ sáng tạo VibeThread.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFHQ3HWPSIJMo5SAjZBnaIAl9-X9nzd8JqqvASlbvtNzYMPdhaNLPrTsb4sQ42X5sBcv9Xn0OepUNaUrpy9xsP1T2TtayzuMNiZzygf1kJfDgxUtQDsJMCH6cNOyP2d6SgMdYC2KgSKPtSA4nofCAzoVr7-Cg64d7Ku6Bhx7EGgbuW-kvrZDJsLlkabDcqVD5yq1-74N9DJ-rqcmgiO3Ocrq7F72ARg571f7cW8m5E1BFIv5sF8ScRdKJ9j3bMuIaXXLHRKb3EJ3MK" }
];

export default function Blog() {
    const [activeTab, setActiveTab] = useState("Tất cả");
    const categories = ["Tất cả", "Xu hướng", "Phối đồ", "Sự kiện"];

    const filteredBlogs = activeTab === "Tất cả"
        ? mockAllBlogs
        : mockAllBlogs.filter(blog => blog.category === activeTab);

    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg bg-surface text-on-surface">
            {/* 1. FEATURED HERO BLOG - Đã chuyển thành Link toàn bộ */}
            <section className="mb-stack-lg">
                {/* 2. Thay đổi thẻ div thành thẻ Link, thêm to="/blog/id" và hover:no-underline */}
                <Link 
                    to="/blog/0" // Giả sử ID của bài viết nổi bật là 0, bạn thay bằng ID thật
                    className="block relative overflow-hidden rounded-xl bg-surface-container group h-[350px] md:h-[500px] flex items-end hover:no-underline"
                >
                    <div className="absolute inset-0 z-0">
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCTjC5O_285QAtaClzdiJ7_4FAMseXZjxc52rAga5wgI_rQJXWhJnmLjwzaWWHz_Ebefx9A4SFuW-6LZsYlLs7bwVsYOR2V8EAUPn5eahLbdk6Mf3ngkPgbithwasd36lghIMpEaAp7OMzE3Z7vyqiz0nXwnZwxqmzuyiRUGdVN-N58NU4doflahGE-q5JKLwos4mnvB7z5TXjLqeulrqJhYTz5CqiUxAYaGqITCe6MAoBticcmr3Kmz_c5_W08cn2f2v5PnlpRyG3Q')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    </div>
                    {/* Đảm bảo text luôn màu trắng trong thẻ Link */}
                    <div className="relative z-10 p-6 md:p-16 max-w-3xl text-white">
                        <span className="bg-primary px-3 py-1 text-label-lg font-label-lg mb-4 inline-block tracking-wider text-white">XU HƯỚNG</span>
                        <h1 className="font-headline-xl text-headline-xl mb-4 leading-tight text-white group-hover:text-white">Nghệ thuật tối giản: Cách định hình phong cách thời trang bền vững</h1>
                        <p className="text-body-lg font-body-lg opacity-90 mb-6 md:mb-8 line-clamp-2 text-white/90">Khám phá cách những thiết kế tối giản không chỉ mang lại vẻ ngoài thanh lịch mà còn là giải pháp cho một lối sống thời trang có trách nhiệm với môi trường.</p>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                <span className="text-label-md font-label-md">12 Tháng 6, 2026</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* 2. MAIN LAYOUT: GRID & SIDEBAR - Giữ nguyên */}
            <div className="flex flex-col lg:flex-row gap-gutter">
                <div className="flex-grow">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <PostCard key={blog.id} post={blog} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-body-lg text-on-surface-variant">
                                Hiện tại chưa có bài viết nào thuộc danh mục này.
                            </div>
                        )}
                    </section>

                    {/* Phân trang - Giữ nguyên */}
                    <div className="mt-stack-lg flex items-center justify-center gap-2 pb-8">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container"><span className="material-symbols-outlined">chevron_left</span></button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container">2</button>
                        <span className="px-2 text-outline">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container"><span className="material-symbols-outlined">chevron_right</span></button>
                    </div>
                </div>

                <BlogSidebar categories={categories} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* 3. NEWSLETTER - Giữ nguyên */}
            <section className="mt-section-padding bg-secondary-container rounded-xl p-10 md:p-16 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary text-[48px] mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                <h2 className="font-headline-lg text-headline-lg text-on-secondary-container mb-2">Đăng ký nhận bản tin thời trang</h2>
                <p className="text-body-lg font-body-lg text-on-secondary-container/80 mb-8 max-w-xl">Cập nhật những xu hướng mới nhất và ưu đãi độc quyền từ VibeThread.Fashion trực tiếp vào hộp thư của bạn.</p>
                <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
                    <input className="flex-grow px-6 py-4 rounded-lg bg-surface-container-lowest border-none text-body-md" placeholder="Địa chỉ email của bạn" required type="email" />
                    <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-container hover:no-underline" type="submit">ĐĂNG KÝ NGAY</button>
                </form>
            </section>
        </main>
    );
}