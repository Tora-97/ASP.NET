import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';
import PostCard from '../../components/PostCard';
import BlogSidebar from './BlogSideBar';
import { Link } from 'react-router-dom';

export default function Blog() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState("Tất cả");
    // --- LOGIC PHÂN TRANG BLOG ---
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6; // Hiển thị 6 bài 1 trang

    // Reset về trang 1 khi click chọn danh mục bên Sidebar
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // 1. SỬA: Gọi đúng hàm getAll() thay vì getAllBlogs()
                const res = await blogService.getAll();

                // 2. SỬA: Axios trả về dữ liệu trong res.data
                const data = res.data || res;
                setAllBlogs(data);
            } catch (error) {
                console.error("Lỗi tải blog:", error);
            }
        };
        fetchBlogs();
    }, []);
    // Lọc bài viết
    const filteredBlogs = activeTab === "Tất cả"
        ? allBlogs
        : allBlogs.filter(blog => (blog.CategoryName || blog.categoryName) === activeTab);

    // Tính toán dữ liệu hiển thị cho trang hiện tại
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg">
            <section className="mb-stack-lg">
                <Link
                    to="/blog/0"
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

            <div className="flex flex-col lg:flex-row gap-gutter">
                <div className="flex-grow">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                        {/* Nhớ truyền đúng prop 'post' cho PostCard */}
                        {filteredBlogs.map((blog) => <PostCard key={blog.Id || blog.id} post={blog} />)}
                    </section>
                </div>
                <BlogSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
        </main>
    );
}