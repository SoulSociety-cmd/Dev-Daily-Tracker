// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Tạo __dirname tương tự CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files từ folder 'dist' (sau khi build React)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Chặn tất cả route khác về index.html để React Router hoạt động
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Port từ env hoặc 3000 mặc định
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
