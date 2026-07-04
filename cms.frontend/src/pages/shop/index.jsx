import React, { useState, useEffect } from 'react';
import ShopSidebar from './ShopSideBar'; 
import ShopHeader from './ShopHeader';
import ProductList from './ProductList';
import LoadingOrEmpty from './LoadingOrEmpty';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["Tất cả"]);
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [isLoading, setIsLoading] = useState(true);
    
    // Phân trang & Sắp xếp
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 
    const [sortOption, setSortOption] = useState('newest');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Gọi song song 2 API: Sản phẩm và Danh mục
                const [prodData, catRes] = await Promise.all([
                    productService.getAllProducts(),
                    categoryService.getAll()
                ]);

                // Xử lý ảnh sản phẩm
                const optimizedProducts = prodData.map((p) => {
                    const id = p.Id || p.id || 1;
                    return {
                        ...p,
                        image: p.Image || p.image || p.ImageUrl || p.imageUrl ||
                            `https://images.unsplash.com/photo-${1500000000000 + (id * 100000)}?w=500&auto=format&fit=crop&q=60`
                    };
                });
                setProducts(optimizedProducts);

                // Xử lý danh mục
                const catData = catRes.data || catRes;
                setCategories(["Tất cả", ...catData.map(c => c.Name || c.name)]);
            } catch (error) {
                console.error("Lỗi tải dữ liệu Shop:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Hàm đổi danh mục & reset trang
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    // --- BƯỚC 1: LỌC THEO DANH MỤC TRƯỚC ---
    const filteredProducts = activeCategory === "Tất cả"
        ? products
        : products.filter(p => (p.CategoryName || p.categoryName) === activeCategory);

    // --- BƯỚC 2: SẮP XẾP TRÊN MẢNG ĐÃ LỌC ---
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Bắt mọi trường hợp chữ Hoa/Thường từ C#
        const priceA = a.Price || a.price || 0;
        const priceB = b.Price || b.price || 0;
        const idA = a.Id || a.id || 0;
        const idB = b.Id || b.id || 0;

        if (sortOption === 'price_asc') return priceA - priceB;
        if (sortOption === 'price_desc') return priceB - priceA;
        return idB - idA; // newest (Mới nhất lên đầu)
    });

    // --- BƯỚC 3: PHÂN TRANG TRÊN MẢNG ĐÃ SẮP XẾP ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // QUAN TRỌNG: Lấy dữ liệu từ sortedProducts thay vì filteredProducts
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem); 
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg flex flex-col md:flex-row gap-gutter">
            
            <ShopSidebar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                allProducts={products} 
            />

            <div className="flex-grow">
                <ShopHeader
                    totalProducts={sortedProducts.length}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem > sortedProducts.length ? sortedProducts.length : indexOfLastItem}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                />

                <LoadingOrEmpty isLoading={isLoading} isEmpty={!isLoading && sortedProducts.length === 0} />

                {!isLoading && sortedProducts.length > 0 && (
                    <>
                        <ProductList products={currentProducts} />

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-12">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setCurrentPage(n)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                            currentPage === n
                                                ? 'bg-primary text-white shadow-md'
                                                : 'bg-surface-variant text-on-surface hover:bg-primary-container'
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}