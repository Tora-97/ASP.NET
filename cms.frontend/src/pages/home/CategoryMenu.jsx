import React from 'react';

export default function CategoryMenu({ activeCategory, onCategoryChange }) {
    const horizontalCategories = [
        "Trang phục nữ mặc ở nhà", 
        "Vest & Âu phục nam", 
        "Đầm dạ hội quý phái", 
        "Thời trang công sở nữ"
    ];

    return (
        <section className="mb-stack-lg">
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
                
                {/* Nút Tất cả sản phẩm */}
                <button 
                    onClick={() => onCategoryChange("Tất cả")}
                    className={`whitespace-nowrap px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider shrink-0 flex items-center gap-2 transition-all ${
                        activeCategory === "Tất cả"
                            ? "bg-primary text-on-primary font-bold shadow-sm"
                            : "bg-secondary text-on-secondary hover:opacity-90"
                    }`}
                >
                    <span className="material-symbols-outlined text-[16px]">grid_view</span> TẤT CẢ NỔI BẬT
                </button>
                
                {/* Vòng lặp các danh mục con */}
                {horizontalCategories.map((cat, i) => (
                    <button 
                        key={i} 
                        onClick={() => onCategoryChange(cat)}
                        className={`whitespace-nowrap px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider shrink-0 border transition-all ${
                            activeCategory === cat
                                ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
                                : "bg-surface-container text-on-surface-variant border-outline-variant hover:bg-surface-variant"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
}