import React, { useState, useEffect } from 'react';
import categoryService from '../../services/categoryService';

export default function BlogSidebar({ activeTab, onTabChange }) {
    const [categories, setCategories] = useState(["Tất cả"]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await categoryService.getAll();
                // 1. SỬA: Phải lấy res.data từ Axios
                const data = res.data || res;
                
                // 2. SỬA: Lấy c.Name thay vì c.name
                setCategories(["Tất cả", ...data.map(c => c.Name || c.name)]);
            } catch (error) {
                console.error("Lỗi tải danh mục:", error);
            }
        };
        fetchCats();
    }, []);

    return (
        <aside className="w-full lg:w-64">
            <h4 className="font-bold mb-4">Danh mục</h4>
            {categories.map(cat => (
                <button 
                    key={cat}
                    className={`block w-full text-left p-2 ${activeTab === cat ? 'text-primary font-bold' : ''}`}
                    onClick={() => onTabChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </aside>
    );
}