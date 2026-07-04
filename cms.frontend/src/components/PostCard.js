// src/components/PostCard.js (SAU KHI SỬA)
import React from 'react';
import { Link } from 'react-router-dom'; // 1. Đảm bảo đã import Link

export default function PostCard({ post }) {
    const UrlChiTiet = `/blog/${post.id}`;

    return (
        // 2. Chuyển container chính thành thẻ Link, thêm class 'block' và 'hover:no-underline'
        <Link
            to={UrlChiTiet}
            className="block bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm border border-outline-variant group hover:shadow-md transition-shadow hover:no-underline"
        >
<img 
    src={post.image ? `${process.env.REACT_APP_IMAGE_BASE_URL}${post.image}` : '/default-post.png'} 
    alt={post.title} 
/>
            <div className="p-5">
                <span className="text-primary text-label-md font-medium tracking-wider uppercase">{post.category}</span>
                {/* Đảm bảo tiêu đề không bị gạch chân khi hover vào ô */}
                <h3 className="font-headline-md text-on-surface mt-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-on-surface-variant text-body-md mt-2 line-clamp-3 opacity-80">{post.excerpt}</p>
                <p className="text-outline text-label-sm mt-3">{post.date}</p>

                {/* 3. NÚT "XEM BÀI" ĐÃ ĐƯỢC XÓA BỎ Ở ĐÂY */}
            </div>
        </Link>
    );
}