const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// 設定 multer，將圖片存入 public/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // 改為 public/images 資料夾
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 生成唯一檔案名
    }
});

const upload = multer({ storage: storage });

// 圖片上傳 API
app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('沒有上傳圖片');
    }
    
    res.json({
        message: '圖片上傳成功',
        imageUrl: '/images/' + req.file.filename // 直接指向 public/images 內的圖片
    });
});

// 允許 Express 處理 JSON
app.use(express.json());

// 設定靜態文件 (提供 public 內的所有靜態資源)
app.use(express.static(path.join(__dirname, 'public')));

// 讀取 data.json
app.get('/api/jewelry', (req, res) => {
    fs.readFile('public/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error("讀取 data.json 失敗：", err);
            return res.status(500).json({ error: '無法讀取資料' });
        }

        try {
            const items = JSON.parse(data);
            if (!Array.isArray(items)) {
                console.error("data.json 內容不是陣列:", items);
                return res.status(500).json({ error: '資料格式錯誤' });
            }
            res.json(items);
        } catch (parseErr) {
            console.error("解析 JSON 失敗：", parseErr);
            res.status(500).json({ error: '無法解析 JSON' });
        }
    });
});

// 儲存新物品到 data.json
app.post('/api/jewelry', (req, res) => {
    const newItem = req.body;

    fs.readFile('public/data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '無法讀取資料' });
        }
        
        let items = JSON.parse(data);
        items.push(newItem);

        fs.writeFile('public/data.json', JSON.stringify(items, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ error: '無法寫入資料' });
            }
            res.json({ message: '新增成功', item: newItem });
        });
    });
});

app.listen(PORT, () => {
    console.log(`伺服器運行中：http://localhost:${PORT}`);
});
