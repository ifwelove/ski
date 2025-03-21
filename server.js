const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// 靜態文件服務
app.use(express.static(path.join(__dirname, 'build')));

// 所有請求都導向 index.html (對於 React 單頁應用很重要)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服務已在端口 ${PORT} 啟動`);
});