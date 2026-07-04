import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../../components/PostCard';

export default function LatestBlog({ posts = [] }) {

    return (
        <section className="mb-stack-lg pt-stack-sm">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.slice(0, 3).map(post => (
                    <PostCard key={post.id || post.Id} post={{
                        ...post,
                        title: post.Title || post.title, // Map đúng field Title
                        image: post.ImageUrl || post.imageUrl // Map đúng field ImageUrl
                    }} />
                ))}
            </div>
        </section>
    );
}