import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productService from '../../services/productService'; // Chỉnh lại đường dẫn nếu cần
import ProductCard from '../../components/ProductCard'; // Chỉnh lại đường dẫn nếu cần

export default function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            setIsLoading(true);
            try {
                // Lấy toàn bộ sản phẩm từ Backend
                const allProducts = await productService.getAllProducts();
                
                // Lọc sản phẩm theo từ khóa (Không phân biệt hoa thường)
                const filtered = allProducts.filter(p => {
                    const name = p.Name || p.name || "";
                    return name.toLowerCase().includes(keyword.toLowerCase());
                });

                // Chuẩn hóa ảnh giống như bạn đã làm ở Home
                const optimized = filtered.map((product) => {
                    const id = product.Id || product.id || 1;
                    return {
                        ...product,
                        image: product.Image || product.image || product.ImageUrl || product.imageUrl ||
                            `https://images.unsplash.com/photo-${1500000000000 + (id * 100000)}?w=500&auto=format&fit=crop&q=60`
                    };
                });

                setProducts(optimized);
            } catch (error) {
                console.error("Lỗi khi tìm kiếm:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (keyword) {
            fetchAndFilterProducts();
        } else {
            setProducts([]);
            setIsLoading(false);
        }
    }, [keyword]);

    return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg min-h-[60vh]">
            <h1 className="font-headline-lg text-headline-lg mb-8">
                Kết quả tìm kiếm cho: <span className="text-primary font-bold">"{keyword}"</span>
            </h1>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-on-surface-variant">Đang tìm kiếm...</p>
                </div>
            ) : products.length > 0 ? (
                // NẾU TÌM THẤY: Hiển thị lưới sản phẩm
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                    {products.map(product => (
                        <ProductCard key={product.Id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                // NẾU KHÔNG TÌM THẤY: Hiển thị trang báo lỗi / Trống
                <div className="flex flex-col items-center justify-center text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm mt-8">
                    <div className="w-32 h-32 mb-6 bg-surface-container rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[64px] text-outline">search_off</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                        Rất tiếc, không tìm thấy sản phẩm nào!
                    </h2>
                    <p className="text-body-md text-on-surface-variant max-w-md mb-8">
                        Chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa <strong className="text-on-surface">"{keyword}"</strong>. Hãy thử kiểm tra lại lỗi chính tả hoặc dùng các từ khóa chung chung hơn.
                    </p>
                    <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-lg font-label-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">storefront</span>
                        Khám phá toàn bộ Cửa Hàng
                    </Link>
                </div>
            )}
        </main>
    );
}