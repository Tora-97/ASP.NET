import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../../services/postService';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                // 1. SỬA: Gọi đúng hàm getDetail(id)
                const res = await blogService.getDetail(id);
                // 2. SỬA: Axios data
                const data = res.data || res;
                setBlog(data);
            } catch (error) {
                console.error("Lỗi lấy chi tiết blog:", error);
            }
        };
        fetchDetail();
    }, [id]);

    if (!blog) return <div className="text-center py-20">Đang tải...</div>;

    // 3. SỬA: Đồng bộ thuộc tính C# (Title, CreatedDate, CategoryName, ImageUrl, Content)
    const title = blog.Title || blog.title;
    const createdDate = blog.CreatedDate || blog.createdDate;
    const categoryName = blog.CategoryName || blog.categoryName || "Chưa phân loại";
    const imageUrl = blog.ImageUrl || blog.imageUrl || '/default-banner.jpg';
    const content = blog.Content || blog.content;

    // Xử lý ảnh an toàn giống trang Product
    const getImageUrl = (imgStr) => {
        if (!imgStr) return '/default-banner.jpg';
        if (imgStr.startsWith('http')) return imgStr;
        return `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076'}/uploads/${imgStr}`;
    };

    return (
        <main className="max-w-3xl mx-auto px-margin-mobile py-stack-lg">
            <header className="mb-stack-md">
                <h1 className="text-headline-xl">{title}</h1>
                <p>📅 {createdDate} | 🏷️ {categoryName}</p>
            </header>
            <img className="w-full h-auto rounded-xl" src={getImageUrl(imageUrl)} alt={title} />
            <article className="prose mt-6" dangerouslySetInnerHTML={{ __html: content }} />
        </main>
    );
}