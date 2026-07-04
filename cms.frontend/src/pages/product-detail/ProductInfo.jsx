import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import productService from '../../services/productService'; // Đảm bảo đã import service này

export default function ProductInfo({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Khởi tạo các state
    const [activeSize, setActiveSize] = useState('M');
    const [activeColor, setActiveColor] = useState('Xanh Navy');
    const [quantity, setQuantity] = useState(1);
    const [cartStatus, setCartStatus] = useState('idle');
    const [isLoading, setIsLoading] = useState(false); // Dùng cho nút Mua ngay

    // Phá gói dữ liệu từ API
    const id = product.Id || product.id;
    const name = product.Name || product.name || "Sản phẩm";
    const price = product.Price || product.price || 0;
    const description = product.Description || product.description || "Đang cập nhật mô tả...";
    const image = product.ImageUrl || product.imageUrl || product.Image || product.image || "";

    const colors = ['Xanh Navy', 'Đen Tuyền', 'Xám Khói', 'Be Sáng'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const getImageUrl = (imgStr) => {
        if (!imgStr) return '/default.jpg';
        if (imgStr.startsWith('http')) return imgStr;
        const baseUrl = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7076';
        const cleanImgStr = imgStr.replace(/^\/?uploads\//, ''); 
        return `${baseUrl}/uploads/${cleanImgStr}`;
    };

    const handleUpdateQuantity = (delta) => {
        const newQty = quantity + delta;
        if (newQty >= 1) setQuantity(newQty);
    };

    const createCartPayload = () => ({
        id: id,
        title: name,
        price: price,
        image: getImageUrl(image),
        quantity: quantity,
        color: activeColor,
        size: activeSize
    });

    const handleAddToCart = () => {
        setCartStatus('loading');
        setTimeout(() => {
            addToCart(createCartPayload());
            setCartStatus('success');
            setTimeout(() => setCartStatus('idle'), 2000);
        }, 500);
    };

    // Hàm Mua ngay hoàn chỉnh (đã gộp logic kiểm tra tồn kho)
const handleBuyNow = async () => {
    setIsLoading(true);
    try {
        // Gọi hàm mới vừa tạo ở bước 1
        const productData = await productService.getProductById(id);
        
        // Kiểm tra an toàn cho thuộc tính số lượng (Stock)
        const currentStock = productData?.StockQuantity ?? productData?.stockQuantity ?? 0;

        if (currentStock < quantity) {
            alert(`Sản phẩm hiện chỉ còn ${currentStock} chiếc trong kho.`);
            setIsLoading(false);
            return;
        }

        addToCart(createCartPayload());

        const user = localStorage.getItem('user');
        if (user) {
            navigate('/checkout');
        } else {
            navigate('/cart');
        }
    } catch (err) {
        console.error("Lỗi:", err);
        alert("Không thể kiểm tra tồn kho. Vui lòng kiểm tra lại kết nối Backend!");
    } finally {
        setIsLoading(false);
    }
};
    return (
        <div className="w-full md:w-1/2 flex flex-col gap-6 pb-24 md:pb-0">
            <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2 leading-tight">{name}</h1>
                <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {price.toLocaleString('vi-VN')}đ
                </span>
            </div>

            <div className="border-t border-outline-variant pt-4">
                <span className="font-label-lg text-on-surface mb-2 block">Màu sắc</span>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <button key={color} onClick={() => setActiveColor(color)}
                            className={`px-4 py-2 border rounded-md font-label-md transition-all ${activeColor === color ? 'border-primary bg-primary-container text-on-primary-container font-bold' : 'border-outline-variant hover:border-primary'}`}>
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-outline-variant pt-4">
                <span className="font-label-lg text-on-surface mb-2 block">Kích thước</span>
                <div className="flex flex-wrap gap-3">
                    {sizes.map(size => (
                        <button key={size} onClick={() => setActiveSize(size)}
                            className={`w-12 h-12 flex items-center justify-center border rounded-md font-label-md transition-all ${activeSize === size ? 'border-primary bg-primary text-white font-bold' : 'border-outline-variant hover:border-primary'}`}>
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-outline-variant pt-4">
                <span className="font-label-lg text-on-surface block mb-2">Số lượng</span>
                <div className="inline-flex items-center border border-outline-variant rounded-lg h-12 w-32">
                    <button onClick={() => handleUpdateQuantity(-1)} className="flex-1 h-full hover:bg-surface-container rounded-l-lg"><span className="material-symbols-outlined">remove</span></button>
                    <span className="flex-1 text-center font-bold">{quantity}</span>
                    <button onClick={() => handleUpdateQuantity(1)} className="flex-1 h-full hover:bg-surface-container rounded-r-lg"><span className="material-symbols-outlined">add</span></button>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button onClick={handleAddToCart} disabled={cartStatus !== 'idle'} className={`flex-1 h-14 rounded-lg font-label-lg transition-all ${cartStatus === 'success' ? 'bg-secondary text-white' : 'bg-transparent border-2 border-primary text-primary hover:bg-primary-container'}`}>
                    {cartStatus === 'idle' ? 'Thêm vào giỏ' : cartStatus === 'loading' ? 'Đang xử lý...' : 'Đã thêm!'}
                </button>
                <button onClick={handleBuyNow} disabled={isLoading} className="flex-1 h-14 bg-primary text-white rounded-lg font-label-lg hover:bg-opacity-90 flex items-center justify-center gap-2">
                    {isLoading ? 'Đang kiểm tra...' : 'Mua ngay'}
                </button>
            </div>

            <div className="mt-8 border-t border-outline-variant pt-6">
                <h3 className="font-headline-md text-headline-md mb-4">Mô tả sản phẩm</h3>
                <div className="text-on-surface-variant font-body-md" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
}