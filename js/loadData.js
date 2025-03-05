function loadJewelryItems() {
    let items = JSON.parse(localStorage.getItem('jewelryItems')) || [];

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.jewelry');
            container.innerHTML = '';

            [...data, ...items].forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.dataset.category = item.category || 'unknown'; // 設定 data-category
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
