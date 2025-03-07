function filterItems(category) {
    let items = document.querySelectorAll('.item');

    // console.log("目前顯示的項目數量:", items.length);  // 確認目前有多少項目需要過濾

    // 英文分類對應中文分類
    const categoryMap = {
        'all': '全部',
        'ring': '戒指',
        'pendant': '吊墜',
        'bracelet': '手串',
        'bangle': '手鐲'
    };

    const categoryName = categoryMap[category] || 'unknown';  // 根據傳入的英文分類獲取中文分類名稱

    items.forEach(item => {
        // console.log("category =", categoryName)
        // console.log("item.dataset.category =", item.dataset.category)
        if (categoryName === '全部' || item.dataset.category === categoryName) {
            item.style.display = 'block';  // 顯示符合分類的物品
        } else {
            item.style.display = 'none';   // 隱藏不符合的物品
        }
    });
}

// 讓點擊分類時不會跳轉頁面
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // 防止 `a` 的預設跳轉行為
    });
});
