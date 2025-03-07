function loadJewelryItems() {
    fetch('/api/jewelry') // 改為從 API 獲取資料
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.jewelry');
            container.innerHTML = ''; // 清空容器

            console.log("所有珠寶項目:", data);  // 確認資料是否正確加載

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.category = item.category || 'unknown'; // 設定 data-category

                // 設定每個珠寶項目的 HTML
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>材質：${item.material}</p>
                    <p>價格：${item.price}</p>
                `;
                container.appendChild(div);
            });

            console.log("珠寶項目載入完成", document.querySelectorAll('.item'));
        })
        .catch(error => console.error('Error loading data:', error));
}

document.addEventListener("DOMContentLoaded", loadJewelryItems);
