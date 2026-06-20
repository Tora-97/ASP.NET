import React from 'react';

export default function ShopHeader({ totalProducts = 0 }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-md gap-4">
            <div>
                <h1 className="font-headline-lg text-headline-lg">Tất Cả Sản Phẩm</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Hiển thị 1 - {totalProducts > 12 ? 12 : totalProducts} trên tổng số {totalProducts} sản phẩm
                </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <label className="font-label-md text-on-surface-variant whitespace-nowrap">Sắp xếp theo:</label>
                <select className="bg-transparent border-none border-b border-outline-variant text-body-md focus:ring-0 focus:border-primary py-1 cursor-pointer">
                    <option>Mới Nhất</option>
                    <option>Giá Thấp đến Cao</option>
                    <option>Giá Cao đến Thấp</option>
                    <option>Phổ Biến Nhất</option>
                </select>
            </div>
        </div>
    );
}