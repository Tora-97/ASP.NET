import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
    const { id } = useParams(); // Lấy ID bài viết từ URL

    // 1. KHO DỮ LIỆU BÀI VIẾT (Mock Database)
    // Tích hợp ID 0 (Bài nổi bật) và ID 1-6 (Các bài trong danh sách)
    const mockBlogDatabase = {
        0: { 
            title: "Nghệ thuật tối giản: Cách định hình phong cách thời trang bền vững", 
            category: "Xu hướng", date: "12 Tháng 6, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTjC5O_285QAtaClzdiJ7_4FAMseXZjxc52rAga5wgI_rQJXWhJnmLjwzaWWHz_Ebefx9A4SFuW-6LZsYlLs7bwVsYOR2V8EAUPn5eahLbdk6Mf3ngkPgbithwasd36lghIMpEaAp7OMzE3Z7vyqiz0nXwnZwxqmzuyiRUGdVN-N58NU4doflahGE-q5JKLwos4mnvB7z5TXjLqeulrqJhYTz5CqiUxAYaGqITCe6MAoBticcmr3Kmz_c5_W08cn2f2v5PnlpRyG3Q",
            author: "Đội ngũ biên tập VibeThread"
        },
        1: { 
            title: "5 cách phối đồ với Blazer cho môi trường công sở hiện đại", 
            category: "Phối đồ", date: "8 Tháng 6, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkdv9hZaNpROx7bH8Za2n9XpsBnPatI_mNiG6ybSlgSS2hMVE46oP_FJgwC-Ij0Byx0V3Q9ZRufyVUcTfuDfWX7nudSII98a1GOWx982h6TPorz78TmLD--v3x6B4dfciq7jQdKIEoYDvxIxU8rQQs2QjWUR_WVjlszVKYtxjEKpdvWF3k696KijW8-Jr1F3IeOi1tMp1Xhl8ZtRtm213yHtFWdaeDsfdmLdOKRvelPgl28LUPtWCo34fduJC8YsTchfQ1qQ8irCdP",
            author: "Stylist Anna Nguyễn"
        },
        2: { 
            title: "VibeThread trình làng bộ sưu tập 'Bản Sắc Việt' tại Fashion Week", 
            category: "Sự kiện", date: "5 Tháng 6, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl5T431LSPI0jEtLgjAg2MzBm7kwWiZhpwlvKkCw98UjlV_hSQy5XD4Yeuy0EVhYxvVwFR4BhxDhmcSQ3YBrLQ143z_WsV_6aGo7L_fx2JEPAP0LW-BPapoRt8-HY-Xy3131XTNq9TsE2k0HT05RlvjH0sThcNDeAbwza8WJHcgkaTL25J1zabMY5JTcgcEmtwuY48tY2t0bnCGGIiY33eCsxdhd9FE7T5uzAS7JUuTSMIFe2M9oCcKfaRdF8eIjJSqCUWxXIs7kos",
            author: "PV Báo Thời Trang"
        },
        3: { 
            title: "Sự trỗi dậy của chất liệu bền vững trong ngành may mặc", 
            category: "Xu hướng", date: "2 Tháng 6, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHiVJdl7ZuVAasLAkWcCD_D95cNJCqtA5nLrGGD_q6Q_Ys8ZoAwGj_O0DrNH12ItHDZG5Ir9oY1YJAQTrm27tgR-X5mGn6rtlGFeo7S_W-xiEx-cXnsRZbCaPvgCTny0dCF9wRr3oWyFg6foJtfZfErsk-IqiHFouzQChXtAaI5AXY7AkeWt8Yz8J7awxsl8CQdEGBYvy0K2NB_We9HMzS9rLj73JxuTFYQ3RQ1lF-dxX033QgmOrT0tlkii0Q49mdWinEk5dMcbGS",
            author: "Chuyên gia Sinh thái Lê Minh"
        },
        4: { 
            title: "Quiet Luxury: Khi đẳng cấp không cần lên tiếng", 
            category: "Xu hướng", date: "28 Tháng 5, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRbp6KQ_KSjJSBd1tdP2AFGYy00_KZpSKS4EqKqJ2YeIvOhwdR3eWpQXKGmGiLBD-LU5SBz-8DbIxJq5P35rcNyZLXuPjBAizwcvRUVg_BDtN22J3eY7JmS20QE6G6nQ4LHTjz-9XWJsJGb29Mu5eunxnzku_9X-uK_7jTw6eAK2OvKI9ka22zzuM9lBCYohSCAgnjaO6gOHzPHIN8bNaArInZiZ5VE59jymHRwC4w3L1yvjPXVNASUkwDfcMxP765g18qAVVyEisS",
            author: "Đội ngũ biên tập VibeThread"
        },
        5: { 
            title: "Phối màu Ton-sur-Ton: Bí quyết cho vẻ ngoài thời thượng", 
            category: "Phối đồ", date: "25 Tháng 5, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdIpUyQQGkqYm4cp_vtT-Pa4SuUUPQbrPJII4-BPLhJVJ9yUWzXfiRe1N9N0Dk-WvObFJRpSgSHvWMLh8t9mgZDgOPRdTQTSYB4SsGAvN2oKIeXghId0ZQ8lHki4vTRQDwLucJokVI-JtigK3hA92L5xHiJ3iDbQqQKn5_Jl4nfyGgiUcmtLGyz7Ud3_GEZRp0aAoBHcHCCs9Wpw-giCaVxK2EYDy-mdHcB-dvVt2SbhdFw8sufLARr4q-0lWNBkVbp1MaFOtQ4UtJ",
            author: "Stylist Trần Hà"
        },
        6: { 
            title: "Hành trình từ ý tưởng đến sàn diễn: Sau cánh cửa VibeThread", 
            category: "Sự kiện", date: "20 Tháng 5, 2026", 
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFHQ3HWPSIJMo5SAjZBnaIAl9-X9nzd8JqqvASlbvtNzYMPdhaNLPrTsb4sQ42X5sBcv9Xn0OepUNaUrpy9xsP1T2TtayzuMNiZzygf1kJfDgxUtQDsJMCH6cNOyP2d6SgMdYC2KgSKPtSA4nofCAzoVr7-Cg64d7Ku6Bhx7EGgbuW-kvrZDJsLlkabDcqVD5yq1-74N9DJ-rqcmgiO3Ocrq7F72ARg571f7cW8m5E1BFIv5sF8ScRdKJ9j3bMuIaXXLHRKb3EJ3MK",
            author: "Designer Trưởng VibeThread"
        }
    };

    // Nội dung HTML giả lập dùng chung cho mọi bài (Sau này lấy từ C#)
    const defaultContentHtml = `
      <p class="text-body-lg mb-4 font-medium leading-relaxed">Thời trang tối giản (Minimalism) không chỉ đơn thuần là việc cắt giảm số lượng quần áo trong tủ đồ, mà nó đã nâng tầm thành một triết lý sống vững bền qua năm tháng.</p>
      <h2 class="text-headline-lg font-bold text-primary mt-6 mb-3">1. Chất lượng - Cốt lõi của sự bền vững</h2>
      <p class="text-body-md mb-4 text-on-surface-variant leading-relaxed">Xu hướng Quiet Luxury đang thúc đẩy việc ứng dụng các vật liệu cao cấp vào quy trình sản xuất. Điều này giúp giảm thiểu tối đa lượng hóa chất độc hại xả ra môi trường tự nhiên.</p>
      <h2 class="text-headline-lg font-bold text-primary mt-6 mb-3">2. Phom dáng Basic - Đầu tư dài hạn cho tương lai</h2>
      <p class="text-body-md mb-4 text-on-surface-variant leading-relaxed">Một chiếc áo khoác dáng dài chất liệu dạ cao cấp hay một chiếc sơ mi được may đo chuẩn xác có thể đồng hành cùng bạn qua nhiều mùa mốt mà không bao giờ lỗi thời. Đầu tư vào chất lượng thay vì số lượng chính là chìa khóa vàng của các quý cô công sở hiện đại.</p>
    `;

    // 2. TÌM KIẾM BÀI VIẾT THEO ID
    const currentBlog = mockBlogDatabase[id] || {
        title: "Bài viết không tồn tại hoặc đã bị xóa",
        category: "Thông báo",
        date: "N/A",
        author: "Hệ thống",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTjC5O_285QAtaClzdiJ7_4FAMseXZjxc52rAga5wgI_rQJXWhJnmLjwzaWWHz_Ebefx9A4SFuW-6LZsYlLs7bwVsYOR2V8EAUPn5eahLbdk6Mf3ngkPgbithwasd36lghIMpEaAp7OMzE3Z7vyqiz0nXwnZwxqmzuyiRUGdVN-N58NU4doflahGE-q5JKLwos4mnvB7z5TXjLqeulrqJhYTz5CqiUxAYaGqITCe6MAoBticcmr3Kmz_c5_W08cn2f2v5PnlpRyG3Q", // Hình mặc định nếu gõ sai ID
    };

    return (
        <main className="max-w-3xl mx-auto px-margin-mobile py-stack-lg">
            {/* Nút quay lại danh sách bài viết */}
            <Link to="/blog" className="inline-flex items-center gap-1 text-primary hover:underline font-label-lg mb-6">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Quay lại Blog
            </Link>

            {/* Thông tin Meta bài viết */}
            <header className="mb-stack-md">
                <span className="text-primary font-bold text-label-md uppercase tracking-wider block mb-2">
                    Chuyên mục: {currentBlog.category}
                </span>
                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight mb-4">
                    {currentBlog.title}
                </h1>
                <div className="flex items-center gap-4 text-outline font-label-md text-label-md">
                    <span>📅 {currentBlog.date}</span>
                    <span>•</span>
                    <span>✍️ Người viết: {currentBlog.author}</span>
                </div>
            </header>

            {/* Ảnh bìa bài viết lớn */}
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-stack-lg bg-surface-container">
                <img className="w-full h-full object-cover" src={currentBlog.image} alt={currentBlog.title} />
            </div>

            {/* Hiển thị nội dung chi tiết dạng HTML raw */}
            <article
                className="prose max-w-none text-on-surface mb-stack-lg"
                dangerouslySetInnerHTML={{ __html: defaultContentHtml }}
            />
        </main>
    );
}