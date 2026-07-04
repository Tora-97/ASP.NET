import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductInfo from './ProductInfo';
import axiosClient from '../../services/axiosClient';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosClient.get(`/ProductsApi/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết sản phẩm:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const crossSellItems = [
        { title: "Quần Chinos Kem", price: "550.000đ", image: "https://via.placeholder.com/150" },
        { title: "Thắt Lưng Da Nâu", price: "320.000đ", image: "https://via.placeholder.com/150" },
        { title: "Sneaker Trắng", price: "950.000đ", image: "https://via.placeholder.com/150" }
    ];

    if (isLoading) return <div className="text-center py-20">Đang tải...</div>;
    if (!product) return <div className="text-center py-20">Không tìm thấy sản phẩm.</div>;

    // HÀM XỬ LÝ ẢNH GIỐNG RAZOR VIEW
    const getImageUrl = (imgStr) => {
        if (!imgStr) return '/default.jpg';
        if (imgStr.startsWith('http')) return imgStr;
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076';
        return `${baseUrl}/uploads/${imgStr}`;
    };

    const imageToRender = product.Image || product.image || product.ImageUrl || product.imageUrl;

    return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md md:py-stack-lg">
            <div className="flex flex-col md:flex-row gap-stack-lg md:gap-gutter">
                <div className="w-full md:w-1/2">
                    <img 
                        className="w-full aspect-[4/5] object-cover rounded-xl border shadow-sm"
                        src={getImageUrl(imageToRender)} 
                        alt={product.Name || product.name || "Product Image"} 
                        onError={(e) => { e.target.src = '/default.jpg'; }}
                    />
                </div>
                <ProductInfo product={product} />
            </div>

            <section className="mt-section-padding mb-16 md:mb-0">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Gợi ý cho bạn</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {crossSellItems.map((item, index) => (
                        <Link to="/shop" key={index} className="min-w-[160px] flex flex-col gap-2 group cursor-pointer">
                            <div className="aspect-[3/4] bg-surface-container-high rounded-lg overflow-hidden border border-outline-variant">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image} alt={item.title} />
                            </div>
                            <p className="font-label-lg text-label-lg truncate group-hover:text-primary transition-colors">{item.title}</p>
                            <p className="font-label-md text-label-md text-primary font-bold">{item.price}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}