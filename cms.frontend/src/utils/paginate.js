const itemsPerPage = 6; // Số sản phẩm/bài viết trên 1 trang

export const paginate = (items, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};