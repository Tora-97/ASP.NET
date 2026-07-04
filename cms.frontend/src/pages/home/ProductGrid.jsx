import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

export default function ProductGrid({ products = [], currentCategoryName }) {
    return (
        <section className="mb-stack-lg">
            <div className="flex justify-between items-end mb-stack-sm border-b border-primary pb-2">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary font-bold uppercase">
                    {currentCategoryName === "Tất cả" ? "SẢN PHẨM NỔI BẬT" : currentCategoryName}
                </h2>
                <Link to="/shop" className="font-label-md text-label-md text-on-surface-variant hover:text-primary mb-1">
                    Xem tất cả cửa hàng ({products.length})
                </Link>
            </div>

            {/* ĐÃ XÓA VÒNG LẶP .MAP BỊ LỖI Ở ĐÂY */}

            {products.length > 0 ? (
                // Lưới (Grid) này sẽ ép kích thước sản phẩm nhỏ lại (2 cột ở mobile, 4 ở desktop)
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                    {products.map(product => (
                        <ProductCard key={product.Id || product.id} product={product} />
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