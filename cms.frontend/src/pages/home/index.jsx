import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';
import postService from '../../services/postService';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Tất cả");

    // --- LOGIC PHÂN TRANG ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    // Hàm xử lý khi đổi danh mục: Bắt buộc reset về trang 1
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            // 1. Lấy sản phẩm và tự động gán ảnh từ internet
            try {
                const productsData = await productService.getAllProducts();

                const optimizedProducts = productsData.map((product) => {
                    const id = product.Id || product.id || 1;
                    return {
                        ...product,
                        image: product.Image || product.image || product.ImageUrl || product.imageUrl ||
                            `https://images.unsplash.com/photo-${1500000000000 + (id * 100000)}?w=500&auto=format&fit=crop&q=60`
                    };
                });

                setProducts(optimizedProducts);
            } catch (e) {
                console.error("Lỗi tải sản phẩm:", e);
            }

            // 2. Lấy bài viết (Post)
            try {
                const postsRes = await postService.getAll();
                const postsData = postsRes.data || [];

                const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076';

                const optimizedPosts = postsData.map((post) => {
                    const id = post.Id || post.id || 1;
                    const rawImage = post.ImageUrl || post.imageUrl || '';

                    let finalImage = `https://picsum.photos/id/${id + 20}/600/350`; // Default

                    if (rawImage.startsWith('http')) {
                        finalImage = rawImage;
                    } else if (rawImage) {
                        const cleanImgStr = rawImage.replace(/^\/?uploads\//, '');
                        finalImage = `${baseUrl}/uploads/${cleanImgStr}`;
                    }

                    return {
                        ...post,
                        ImageUrl: finalImage
                    };
                });

                setPosts(optimizedPosts);
            } catch (e) {
                console.error("Lỗi tải bài viết:", e);
            }

            // Lấy danh mục sản phẩm (Category)
           try {
                const catRes = await categoryService.getAll();
                const catData = catRes.data || catRes;
                
                // ĐÃ SỬA: Ưu tiên lấy c.name trước theo đúng log của bạn
                const categoryNames = ["Tất cả", ...catData.map(c => c.name || c.Name)];
                setCategories(categoryNames);
            } catch (e) {
                console.error("Lỗi tải danh mục:", e);
            }
        };

        fetchData();
    }, []);

    // --- LOGIC LỌC SẢN PHẨM MỚI NHẤT ---
    // Sắp xếp mảng products theo ID giảm dần (mới nhất lên đầu) và lấy 5 sản phẩm đầu tiên
    const newestProducts = [...products]
        .sort((a, b) => (b.Id || b.id || 0) - (a.Id || a.id || 0))
        .slice(0, 3);

 // LOGIC LỌC: Bọc lót mọi trường hợp chữ Hoa/Thường từ C# trả về
    const filteredProducts = activeCategory === "Tất cả"
        ? products
        : products.filter(p => {
            // Lấy tên danh mục của sản phẩm ra (Hỗ trợ cả trường hợp C# lồng object CategoryProduct)
            const catNameOfProduct = p.CategoryProduct?.Name || p.categoryProduct?.name || p.categoryName || p.CategoryName;
            
            return catNameOfProduct === activeCategory;
        });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <main className="flex-1 flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-24 md:pb-12 pt-stack-sm md:pt-stack-md">
            <HeroBanner />
            
            {/* --- KHU VỰC 1: SẢN PHẨM MỚI NHẤT --- */}
            {newestProducts.length > 0 && (
                <div className="mb-12">
                    {/* Tái sử dụng ProductGrid, truyền chữ cứng vào để đổi Title */}
                    <ProductGrid
                        products={newestProducts}
                        currentCategoryName="SẢN PHẨM MỚI NHẤT" 
                    />
                </div>
            )}

            {/* --- KHU VỰC 2: SẢN PHẨM NỔI BẬT (CÓ LỌC DANH MỤC) --- */}
            <div className="border-t border-outline-variant pt-8">
                <CategoryMenu categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-xl text-gray-500">Không tìm thấy sản phẩm!</div>
                ) : (
                    <>
                        <ProductGrid
                            products={currentProducts}
                            currentCategoryName={activeCategory} // TRUYỀN DÒNG NÀY ĐỂ TITLE ĐỘNG
                        />
                        
                        {/* Nút phân trang */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 my-8">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button 
                                        key={n} 
                                        onClick={() => setCurrentPage(n)} 
                                        className={`px-4 py-2 rounded font-bold transition-colors ${currentPage === n ? 'bg-primary text-white shadow-md' : 'bg-surface-container hover:bg-primary-container text-on-surface'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <LatestBlog posts={posts} />
        </main>
    );
}