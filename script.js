function filterItems(category) {
    let items = document.querySelectorAll('.item');

    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
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