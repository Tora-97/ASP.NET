import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

export default function ProductGrid({ products = [], currentCategoryName }) {
    return (
        <section className="mb-stack-lg">
            <div className="flex justify-between items-end mb-stack-sm border-b border-primary pb-2">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary font-bold uppercase">
                    {/* Hiển thị động tên danh mục đang chọn */}
                    {currentCategoryName === "Tất cả" ? "SẢN PHẨM NỔI BẬT" : currentCategoryName}
                </h2>
                <Link to="/shop" className="font-label-md text-label-md text-on-surface-variant hover:text-primary mb-1">
                    Xem tất cả cửa hàng ({products.length})
                </Link>
            </div>
            
            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-gutter">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-body-lg text-on-surface-variant">
                    Hiện tại danh mục này đang cập nhật sản phẩm nổi bật.
                </div>
            )}
        </section>
    );
}