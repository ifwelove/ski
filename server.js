const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// 靜態文件服務
app.use(express.static(path.join(__dirname, 'build')));

// 所有請求都導向index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服務運行在端口 ${PORT}`);
});