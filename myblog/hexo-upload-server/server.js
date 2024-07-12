const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// 设置文件存储路径
const upload = multer({ dest: 'uploads/' });

// 处理文件上传请求
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded: ${file.filename}`);
});

// 提供上传文件的列表
app.get('/files', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory.');
        }
        res.json(files);
    });
});

// 提供上传文件的访问
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
