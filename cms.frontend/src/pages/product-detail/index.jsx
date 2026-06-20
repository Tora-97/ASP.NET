import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductInfo from './ProductInfo';

export default function ProductDetail() {
    const { id } = useParams();

    const mockProductRepository = {
        1: { title: "Áo Sơ Mi Linen Teal", price: 850000, originalPrice: 1150000, desc: "Dòng sản phẩm Linen cao cấp từ VibeThread mang đến sự kết hợp hoàn hảo giữa vẻ đẹp mộc mạc và sự sang trọng hiện đại.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfzaGDB22hiBcDZ5yoqgFG0Vi87oXADAWS-blO2tw31LMnzShkFz7eACyQPIRS1VMIpiYUQSpouq3BxlTrohCeakLEGF39jdaYnB1yG6ZoTsSr0B7SFGxDieoMd7ocPY-Rrm1LCUoBrIMXAj_6rbysvCPTkr5i4exZTDHEuaPoFWwmhNFzqJaRm8WfF1O_8SW4MUNSVgzeQvwzh3lxeDORfmb2p_fv9SYpMMsLGz6T2R8CjqfQGuAjcugUtf-nVYrw_0ByhQotZo2q", badge: "Mới về" },
        2: { title: "Áo Sơ Mi Nam Business Knit", price: 999000, originalPrice: null, desc: "Sợi dệt thun công nghệ mới co giãn 4 chiều tốt.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh1OucL-E1jLUXthISjVwVjNhjPBo18RNFr8ZSun0ELsnL5d5a8cessu0I1thW6cSeJ_9h36VyIUNVWzGaLj-05mFQWgVS03EIcr68rwkwfW4dAkgqfHXEcchtSa73QvXPWNyY6xBZ8nZMGOiQb-wfDhCEEhBPFE24jV2-_1h5LE-kAJaePyCTpQb_p-FhFaWZijmxoWwnr5MBzdjtDMwQ8Pr60_QamuX1hJzoX9BW6waRCJuWeH7vsxqNQeiOicY3LymKK7jqlagO", badge: null }
    };

    const currentProduct = mockProductRepository[id] || mockProductRepository[1];

    // Dữ liệu Gợi ý mua chéo
    const crossSellItems = [
        { title: "Quần Chinos Kem", price: "550.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfV6gwKVQ7ZFFjdFfugkZQj8u5gBNOCiQrURwwdY_5ftYkYzU0irrOngGWdjSd1vV9LhRx3PKl_b9raD8Wo6xvcwtwJpGxZ15CpW0FuxkKnO_VZ65sXJ_hdO7K20kgSWSMB1SnvPEO1SF3uHlJQrhDRNYseFHDtiOuX6n68Q0LAHrnVGj0_oUNdqYHn_Tj55t1J2qaXv2KnklfXGqHFkfap7qMxZO5hplzsS5Nz5ICLdXDXfOpxrMI-L8aV8fBNN1WMATZIaDzPxkH" },
        { title: "Thắt Lưng Da Nâu", price: "320.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWRfLrMRk-E_tTlF-h4VD91FrYcKv586YCdW3zJOPAadPrx35_XQb1JHd7oj_nY9XfDeN4rByP8_BZT5S2FhBjecvzsaidgDeBYD3wCDqe2cAxkeSucDYmkQPdRV51CO3kM8gXtqr5GhRE9ULyoiBlOM31ybPn5hfFTWLNO689l2Mu6GahXtWW2TVFLIyRPiijWzmfgmXX_I4Ayawt6yDDM2NSqSP_t-VbMUR2iLX1A8LOJqa5oLZZnskeLmEV8x0FpWf5ZtnCgIr1" },
        { title: "Sneaker Trắng", price: "950.000đ", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhRTK1BSEg-RkWOVehDPxl2Dr5xRjOcFv2eKCF9z3-QwkHUfwd1Wi95EIL_EJjsIgoqPORVOs0ENcKFHIo-tT79-496c5WIz6Od7-fkpp-Sjy6KBHUzCze3XdvWrvSkHGh5afR4O1HQtkc0Pmu-epEKoklxiR3NL58R_Hzkw0D2uOpnvJ62bfxwhvF4yxPoPvDkUmeGjLp5ONzby4R8bf9-HyR0ay7CFZq0r9ZV_jYCAi6_5vVZoaE5Of4WLuolLf-wqSYCCezCI00" }
    ];

    return (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md md:py-stack-lg overflow-x-hidden">
            
            <div className="flex items-center gap-2 mb-stack-md">
                <Link to="/shop" className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 -ml-2">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Chi tiết sản phẩm</h2>
            </div>

            {/* Layout chính 2 cột cho Desktop, 1 cột xếp chồng cho Mobile */}
            <div className="flex flex-col md:flex-row gap-stack-lg md:gap-gutter">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden rounded-xl">
                        <img 
                            className="w-full h-full object-cover" 
                            src={currentProduct.image} 
                            alt={currentProduct.title}
                        />
                        {currentProduct.badge && (
                            <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 font-label-lg text-label-lg rounded-lg shadow-sm uppercase tracking-wider">
                                {currentProduct.badge}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info Section */}
                <ProductInfo product={currentProduct} id={id} />
            </div>

            {/* Recommended / Cross-sell Section */}
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