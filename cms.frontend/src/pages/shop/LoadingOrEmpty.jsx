import React from 'react';

export default function LoadingOrEmpty({ isLoading, isEmpty }) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 w-full">
                {/* Hiệu ứng Spinner quay vòng tròn chuẩn Tailwind */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-body-lg text-on-surface-variant animate-pulse">Đang tải danh sách sản phẩm...</p>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center w-full max-w-md mx-auto">
                <span className="material-symbols-outlined text-[64px] text-outline mb-4">
                    checkroom
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Không tìm thấy sản phẩm
                </h3>
                <p className="text-body-md text-on-surface-variant/70">
                    Rất tiếc, không có sản phẩm nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Hãy thử đổi bộ lọc khác nhé.
                </p>
            </div>
        );
    }

    return null;
}