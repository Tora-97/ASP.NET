import React, { useState } from 'react';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

// Cập nhật lại thuộc tính 'category' cho Mock Data sản phẩm
const mockProducts = [
    { id: 1, category: "Vest & Âu phục nam", title: "Áo sơ mi dài tay Oxford Premium", price: 999000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUCm-zQ_HI_nFk_odID-unm5KdU3wlXdmegknJec26_txcvbXkNFghsX0wXzWNETHC7HXSbzLI6x0Riom0vHXtwaTBXKOZTpDpgd18eoGmxysuVKT_xR6FUXanx_JIsbueA8b3fCrynfFIQYV2_MHOx_c-l6wOkomNRwkYScEi4e4U3FCfhmJR_7pcKX4CoZGM6S7mwU0y51ayscaZwJS46HkpOhBugLF28qk1DYziaFLxBpmWP9jQ6JE49aUowvSVbnP1tydpcxzR", label: "Bán chạy / Còn 4 chiếc", isAvailable: true },
    { id: 2, category: "Thời trang công sở nữ", title: "Áo Sơ Mi Nam Business Knit", price: 999000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh1OucL-E1jLUXthISjVwVjNhjPBo18RNFr8ZSun0ELsnL5d5a8cessu0I1thW6cSeJ_9h36VyIUNVWzGaLj-05mFQWgVS03EIcr68rwkwfW4dAkgqfHXEcchtSa73QvXPWNyY6xBZ8nZMGOiQb-wfDhCEEhBPFE24jV2-_1h5LE-kAJaePyCTpQb_p-FhFaWZijmxoWwnr5MBzdjtDMwQ8Pr60_QamuX1hJzoX9BW6waRCJuWeH7vsxqNQeiOicY3LymKK7jqlagO", label: null, isAvailable: true },
    { id: 3, category: "Trang phục nữ mặc ở nhà", title: "Áo hai dây nữ màu nâu thuần", price: 999000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYR6tSQ2BFcf51-Du0nm2rjYw531Ivceddghlg3g_T-7CX8hML5QsI8O1vmI-7bm0lLNqoiGgfwuIUtbcy9lzeXxqD5DVsKS6gYe4uLtw1yWBaqG9k0-UDpVOk0cZQ22xzgMlSyDneZcTuXrkGEeLsi5M0D3ffSL739vZXcIHtMTAycYBUknP-au8HVLgM8J7GWoR385LJZjKVvdN9Z6Gpa3lFbeEnHCGUkMi0NSXTGFqAyLGnMI_rVDrrpbrc9TIV11calpo55IZy", label: null, isAvailable: true },
    { id: 4, category: "Đầm dạ hội quý phái", title: "Áo hai dây nữ màu vàng tươi", price: 0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVcSnC-Ip12yeZT3jd2WXluq6Ab5cyJICqmuF2oxDSs9p4Ay-taTQg_yNnTTEeU-spCvY663xhTtk0ydTOXLhcQ0vV0RCV39NWR6dX5NQ5xoD04hhvDGVEK3VnBhu_w_axSjvsvAOJPlbQxUGzKy236steaCUZb4O-0PBb5hpap_AxQ35tx_rQvuAvgySzyo2P4IHxuFmalVgDQwRVQC3o6RnPzzDMCprWxfJ1-XAQTToi_JPHlqP5PRDGydKGpBzVKAGez5uAS-A", label: "Bán chạy / Hết hàng", isAvailable: false }
];

const mockPosts = [
    { id: 1, title: "Phong cách áo đầm đẹp cho mùa lễ hội", date: "2/6/2026", excerpt: "Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB139OiHKhP7xDdP3gQlNJR_q6h9sAmQrkwjLXrJWGlTE25x0uJgBUygKSaI4gYwPI0OIMtC5_XDSV4ogXHrEGsyAp6LbPsfCHVrY-M-czgWKvsLTD3mTp9FDAGmOTEVawdujiUPdg2cECD6j0yobytAf7Xqn_tKRcjjUinmmZpF4Do1W9nme5_hL-D1NvYcHWYvvhkzfNJEBGEShcDcj_K-7C6jVXDuDtdP1CuRxHueEzAqydyU03fW8tFULPRFM8UF6OWnfyIqms_" },
    { id: 2, title: "Tips chọn váy trắng 'hack dáng' từ A đến Z cho mọi quý cô công sở", date: "1/6/2026", excerpt: "Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClcGmg9z6Y4P7NYUF2Tv4kQ0PTH2BuX9TZ4wIozVoIA8I4H2nyWot_yGKGWj7IsK9_IERhUzbYPXIYF0PJZsOfm_xhth60S4OCy5LIS_gt0Q3aAh19o4oMkCK6FScHdKISdecJ1VcTYLed9abfvCLquuE7dZOCQy5-XqCMRscYYmq-bZiaSCRl_4BR9UjXvsoFP0um1727eZAQPZXt6jzARZYodA_EB06Y9CfdgHXNZ6xThY_Kt3r5yywldNNG14gXbdIoA4SZU79v" },
    { id: 3, title: "Top 7 kiểu áo sơ mi sang chảnh tôn dáng cho quý cô công sở 2026", date: "2/6/2026", excerpt: "Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng...", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8LnNCKQz9RuXf6baZzQdho5H1Fve9njZnWBb1z9WiNn1Jfy_FnV58u2bbT_wZkiXbexI9a2TL0ecedgQXu8Eo564PPf16zk-_QhZOYsa0AflxE169YHnMHmpa3vGr4gwgCGHy4gsvY7w7-yyrme_v5D5wEG3etq7VI8eXy46aNlO_VAFPGGlKONHHwxPiu0GEf4HLxDYDb-apyayxmMJBdzMn-dW29Lo1a8ZX4-0PAMUaLmWM-Q8S9TyLwfMYKsNKtEjrxv1MWbLz" }
];

export default function Home() {
    // 1. Quản lý danh mục đang được chọn (Mặc định là "Tất cả")
    const [activeCategory, setActiveCategory] = useState("Tất cả");

    // 2. Logic lọc danh sách sản phẩm dựa trên danh mục đang chọn
    const filteredProducts = activeCategory === "Tất cả"
        ? mockProducts
        : mockProducts.filter(product => product.category === activeCategory);

    return (
        <main className="flex-1 flex flex-col w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-24 md:pb-12 pt-stack-sm md:pt-stack-md">
            
            <HeroBanner />

            {/* 3. Truyền activeCategory và hàm thay đổi state xuống Menu */}
            <CategoryMenu 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
            />

            {/* 4. Truyền danh sách sản phẩm đã lọc và tên danh mục hiện tại xuống Grid */}
            <ProductGrid 
                products={filteredProducts} 
                currentCategoryName={activeCategory}
            />

            <LatestBlog posts={mockPosts} />

        </main>
    );
}