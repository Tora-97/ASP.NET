import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../../components/PostCard';

export default function LatestBlog({ posts = [] }) {
    return (
        <section className="mb-stack-lg pt-stack-sm">
            <div className="text-center mb-stack-md">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary font-bold uppercase mb-2">
                    XU HƯỚNG THỜI TRANG
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất cùng VibeThread.{' '}
                    <Link to="/blog" className="text-primary font-bold hover:underline inline-flex items-center gap-0.5">
                        Xem tất cả bài viết <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </p>
                <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}