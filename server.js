const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

// 静态文件服务
app.use(express.static(__dirname));

// 主页面路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log('双色球AI选号助手V23版本服务器已启动！');
    console.log('访问地址: http://localhost:3003');
});