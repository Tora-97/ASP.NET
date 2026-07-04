import React from 'react';

export default function CategoryMenu({ categories = [], activeCategory, onCategoryChange }) {
    
    // Nếu mảng rỗng, ít nhất cũng hiện chữ "Tất cả" để người dùng click
    const displayCategories = categories.length > 0 ? categories : ["Tất cả"];

    return (
        <section className="mb-stack-md">
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {displayCategories.map((cat, index) => (
                    <button 
                        key={index} 
                        onClick={() => onCategoryChange(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md transition-colors ${
                            activeCategory === cat 
                                ? 'bg-primary text-white shadow-sm' 
                                : 'bg-surface-variant text-on-surface hover:bg-primary-container'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
}