import React from 'react';

export default function ShopSidebar({ categories = [], activeCategory, onCategoryChange, allProducts = [] }) {
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    // Hàm đếm số lượng sản phẩm cho từng danh mục
    const getCount = (catName) => {
        if (catName === "Tất cả") return allProducts.length;
        return allProducts.filter(p => (p.CategoryName || p.categoryName) === catName).length;
    };

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-stack-lg">
                {/* Categories - ĐÃ KẾT NỐI API */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Danh Mục</h3>
                    <ul className="space-y-2 font-body-md text-body-md">
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                onClick={() => onCategoryChange(cat)}
                                className={`flex justify-between items-center cursor-pointer py-1 transition-colors ${
                                    activeCategory === cat ? 'text-primary font-bold' : 'hover:text-primary text-on-surface'
                                }`}
                            >
                                <span>{cat}</span>
                                <span className="text-label-md text-outline bg-surface-container-high px-2 py-0.5 rounded-full">
                                    {getCount(cat)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Các bộ lọc tĩnh (Màu sắc, Kích cỡ, Giá) giữ nguyên phần UI của bạn */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Kích Cỡ</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`border py-2 text-label-md transition-colors border-outline-variant hover:border-primary`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Khoảng Giá</h3>
                    <input className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer" type="range" min="500" max="5000" />
                    <div className="flex justify-between mt-2 font-label-md text-outline">
                        <span>500k VNĐ</span>
                        <span>5,000k VNĐ</span>
                    </div>
                </section>
            </div>
        </aside>
    );
}