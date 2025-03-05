function filterItems(category) {
    document.querySelectorAll('.item').forEach(item => {
        item.style.display = (category === 'all' || item.dataset.category === category) ? "block" : "none";
    });
}


// 讓點擊分類時不會跳轉頁面
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();  // 防止 `a` 的預設跳轉行為
    });
});