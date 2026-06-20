import React, { useState, useEffect } from 'react';
import ShopSidebar from './ShopSideBar';
import ShopHeader from './ShopHeader';
import ProductList from './ProductList';
import LoadingOrEmpty from './LoadingOrEmpty';

// Dữ liệu Mock mẫu từ Service đổ về
const mockShopProducts = [
    { id: 1, title: "Áo Sơ Mi Linen Teal", price: 850000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaj0qN5WfYVs977o4oW8TeATZKDOkWiQNAzZIwg5xgM-eefV5nmeci9oAAFdxQqECB8-Fm5uhzcyKpzotsbtFCvDhLFRkWkEishexAMOy9rVg1QBFgZrDYJ89swBmyaqJq7x2s63OTMTP0x367agLjYojDS3ZiPT_-aySBrkJ0PdF9IWBEqvlRG6F9aVnFrQSjRg5UE3Gxh0eaAfyXhjrWUfqjh6zQZ6TIxq9N1m_hKFhFzyNEehRw3Y2NBCt2NnCd-qoIXVh94u2W", label: "MỚI", isAvailable: true },
    { id: 2, title: "Blazer Navy Cổ Điển", price: 1250000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP60RSB0z_YUlg3E-KPX6KbqHe6sWg1mq34eyzRYXQjSO52vyEkYNWCH1e0GDNBWt-Wx-cOlgN3ciVBUycwND1cU9T7gYEB21Xx4xlzuyl3-LRAesIkgheUk6mtkZDPjsoS-CmyW4ToWEuM441--0HlSWUMRcUYWS2eDKB_75oo2HDA_gznN2HsRYFPCnqH5WhudKk3B4MnDRq-8X3BsF2O6e1dQMRk98RoaDHv0iP-dV6iH0NFwsvG0Xcxm1nLexPDheMcG0NG0J6", label: "HOT", isAvailable: true },
    { id: 3, title: "Quần Tây Charcoal", price: 950000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKByh_h9FdktlK-wVDIEd7lhk7AX7YwchFLmUSxAbhK6kI8n9gIsoIrfMYZ6DzxK-rO51jNnVyK1YgNHsVsP1k94WrFNsOK4CbDvJQjT9MlKzYREYwQoA0IcnVSAno_J69x-tSSsmhPaMN4QLMF73tSkS_orK_ld6cIWGLdXEng378MSx4Ln6YXpAOihLuWhadRZUfNHQ8fq4yu__IAlH5CF52FbYEtOciz_K0wqbbZdKBoD-as1CbiwY0smYUq5Ov5O5cxuDKq0cO", label: null, isAvailable: true },
    { id: 4, title: "Tote Bag Da Bò Thật", price: 2450000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-X5Wvh_oEekQNEs9XnIcB7W5UWwj6SozxxoAqx5uxYti3rynngSylQGKbZ2jsK_pTEC_-CtMgSQSVBS0Y69Em1sY78tn9p3lr9ZdQJLLZB-4bxR_1RXasbpstyneyHPLJCEEPSkyKfaMT6lnjWiXXUr7NFhmwIQ48ObKBZf4sgHMiUXlp2vZG-YeYlkikTbZ7iGCfyfIcM2SLT-oSYF8M_oTOznsCAYiD53InDo31acdRtjTgEzpie5Cya_vgVUmCoZByZfBWyWrM", label: null, isAvailable: true },
    { id: 5, title: "Váy Cotton Minimalist", price: 1100000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIrVTR5o9ubf41hhuBb99HmAVgoIM1yJFONG-dkm4L6xOMw7FS40F3MOz5hCMHfatDEKTvmf6OLmr1vSv0bC7EFwdEtxLyibmYkiMVgZB4s7iAWG0597UQxebA-Y6gf3B-nMhlh_62JBWTj7pjMX8ZTU24qE02seDMq3doO7vHBif5mu7Q_gUa_MdtRcvQ3snKJx8nDUnmTKhWu-G7rToR0qGlIgezA02cxWJoq6RwLvfQTGWqBjm_RML91ujiXxFNSDabqacDkK2E", label: null, isAvailable: true },
    { id: 6, title: "Cà Vạt Lụa Jacquard", price: 450000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtu2-n_HGtCOaOG-9AgG_tBPHbRSTRYRaLOtoUTbO3zG6ObqrTJtaBJQKcZH_Uiq1RZwiPqL1rIH_6plsnOZBg4dhClI9kbqcn5qpt-iXagaNCoMZdGzxcK625l59-nehBQ5HxGdFkcR6DIzPndMiNdTtvarIlm8pbtb79yXUebtUZb0Jp4_NSTFv_rjPDlydytcWHXgt9t4PpgQR--DnQRLXrijFKj4GL4YQuIh2BQaNT8vf5ggSLelesDTOsERy29SfTZKVpSxJ4", label: null, isAvailable: true },
    { id: 7, title: "Trench Coat Classic", price: 3200000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW-MzuEKgkd6Fb5tauKwHr0nq7RwawyHp3zuolnp3LK0AaMUpWaehZOmqVw7rBPMUMFoUl4aPTbupU76kpkY-GOzgk8VJLierE_Yq8cj8LaPFFGDJqWqm2sAjGhHl2KjtGCFdWrs5kj_-tb4AYWEduQoPicuL2chtlVKC0daZN008vX2PJHJ5h_0otMqu83bjDFDfWrD1nUL_bJa12ZxnPHFm76uDVSpYNcQXePW8ySRRNOuIy5DOuzbXu-5TfIARvrf3UQ0OShvx6", label: "LIMITED", isAvailable: true },
    { id: 8, title: "Giày Loafers Da Cao Cấp", price: 1850000, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPpdoqe7_snuCWomf9AMBx2EITHm0cd_4wGfqBgRdcCZdcY9udYRO5u0seXt4lHC-bl3D1Ux_2mufASjM9kxuEBExhnj91ZhA7BhW9pYSjsh5t5-T6ntobm_s8dm_lyf_o20gPBtr6g0bnAycAi05FAP17Ys-rAJWkpDLxcpFNMV4H26DA4Mf_k3-0v6-NqTdXZ5wbOgcwrUIDWZ2rY8B_O7qRZfMANv1XGKvCpdY3p3foEsMUs-gA3K1uqGbehTbTYqSwsJULTEgP", label: null, isAvailable: true }
];

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Giả lập hiệu ứng tải mạng ngầm mượt mà khi đổi trang
    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(mockShopProducts);
            setIsLoading(false);
        }, 800); // Tải sau 0.8 giây
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="max-w-container-max mx-auto px-gutter py-stack-lg flex gap-gutter">
            {/* 1. CỘT BỘ LỌC BÊN TRÁI */}
            <ShopSidebar />

            {/* 2. KHU VỰC HIỂN THỊ SẢN PHẨM BÊN PHẢI */}
            <div className="flex-grow">
                <ShopHeader totalProducts={isLoading ? 0 : products.length} />

                {/* Xử lý UX Trạng thái Tải/Trống bằng Component vừa tạo */}
                <LoadingOrEmpty isLoading={isLoading} isEmpty={!isLoading && products.length === 0} />

                {/* Nếu tải xong và có sản phẩm thì in danh sách ra */}
                {!isLoading && products.length > 0 && (
                    <>
                        <ProductList products={products} />

                        {/* Pagination Component */}
                        <div className="mt-stack-lg flex justify-center items-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">3</button>
                            <span className="mx-2 text-outline">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">12</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}