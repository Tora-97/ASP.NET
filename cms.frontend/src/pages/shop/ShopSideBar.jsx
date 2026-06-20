import React from 'react';

export default function ShopSidebar() {
    const categories = [
        { name: "Tất Cả Sản Phẩm", count: 128, active: true },
        { name: "Áo Sơ Mi", count: 42 },
        { name: "Quần Tây & Khaki", count: 35 },
        { name: "Váy & Đầm", count: 28 },
        { name: "Phụ Kiện", count: 23 },
    ];

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    return (
        <aside className="w-64 flex-shrink-0 hidden md:block">
            <div className="sticky top-24 space-y-stack-lg">
                {/* Categories */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Danh Mục</h3>
                    <ul className="space-y-2 font-body-md text-body-md">
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                className={`flex justify-between items-center cursor-pointer transition-colors ${cat.active ? 'text-primary font-bold' : 'hover:text-primary'}`}
                            >
                                <span>{cat.name}</span>
                                <span className="text-label-md text-outline">{cat.count}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Filter by Color */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Màu Sắc</h3>
                    <div className="flex flex-wrap gap-2">
                        <button className="w-6 h-6 rounded-full bg-[#191c1d] border border-outline ring-offset-2 hover:ring-2 hover:ring-primary transition-all"></button>
                        <button className="w-6 h-6 rounded-full bg-[#ffffff] border border-outline-variant ring-offset-2 hover:ring-2 hover:ring-primary transition-all"></button>
                        <button className="w-6 h-6 rounded-full bg-[#2c9faf] border border-outline ring-offset-2 hover:ring-2 hover:ring-primary transition-all ring-2 ring-primary"></button>
                        <button className="w-6 h-6 rounded-full bg-[#bc151a] border border-outline ring-offset-2 hover:ring-2 hover:ring-primary transition-all"></button>
                        <button className="w-6 h-6 rounded-full bg-[#e7e8e9] border border-outline ring-offset-2 hover:ring-2 hover:ring-primary transition-all"></button>
                        <button className="w-6 h-6 rounded-full bg-[#9fd1ff] border border-outline ring-offset-2 hover:ring-2 hover:ring-primary transition-all"></button>
                    </div>
                </section>

                {/* Filter by Size */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Kích Cỡ</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`border py-2 text-label-md transition-colors ${size === "S" ? 'border-primary text-primary font-bold' : 'border-outline-variant hover:border-primary'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Filter by Price */}
                <section>
                    <h3 className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider mb-stack-md">Khoảng Giá</h3>
                    <input className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer" type="range" min="500" max="5000" />
                    <div className="flex justify-between mt-2 font-label-md text-outline">
                        <span>500k VNĐ</span>
                        <span>5,000k VNĐ</span>
                    </div>
                </section>

                <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-lg hover:opacity-90 transition-opacity uppercase tracking-widest">
                    Áp dụng bộ lọc
                </button>
            </div>
        </aside>
    );
}