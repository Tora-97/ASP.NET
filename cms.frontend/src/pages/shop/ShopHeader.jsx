import React, { useState, useRef, useEffect } from 'react';

export default function ShopHeader({ 
    totalProducts = 0, 
    indexOfFirstItem = 0, 
    indexOfLastItem = 0,
    // THÊM 2 PROPS NÀY ĐỂ KẾT NỐI VỚI TRANG SHOP
    sortOption = 'newest',
    onSortChange
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Danh sách các kiểu sắp xếp
    const options = [
        { value: 'newest', label: 'Mới Nhất' },
        { value: 'price_asc', label: 'Giá: Thấp đến Cao' },
        { value: 'price_desc', label: 'Giá: Cao đến Thấp' }
    ];

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Tìm tên nhãn đang được chọn
    const currentLabel = options.find(opt => opt.value === sortOption)?.label || 'Mới Nhất';

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-md gap-4">
            <div>
                <h1 className="font-headline-lg text-headline-lg">Tất Cả Sản Phẩm</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    {totalProducts === 0 
                        ? 'Không có sản phẩm nào' 
                        : `Hiển thị ${indexOfFirstItem + 1} - ${indexOfLastItem} trên tổng số ${totalProducts} sản phẩm`
                    }
                </p>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <label className="font-label-md text-on-surface-variant whitespace-nowrap">Sắp xếp theo:</label>
                
                {/* GIAO DIỆN DROPDOWN CUSTOM */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-lg border border-outline-variant text-body-md hover:border-primary transition-colors min-w-[180px] justify-between"
                    >
                        <span className="font-bold text-primary">{currentLabel}</span>
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                        </span>
                    </button>

                    {/* MENU ĐỔ XUỐNG */}
                    <div className={`absolute right-0 top-full mt-2 w-full min-w-[180px] bg-white border border-outline-variant rounded-lg shadow-[0px_8px_24px_rgba(0,0,0,0.12)] z-50 overflow-hidden transition-all duration-200 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
                        {options.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    if (onSortChange) onSortChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-body-md transition-colors hover:bg-surface-container ${
                                    sortOption === opt.value 
                                        ? 'text-primary font-bold bg-primary-container/20' 
                                        : 'text-on-surface'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}