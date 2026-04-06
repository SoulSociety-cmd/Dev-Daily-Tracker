// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Tạo __dirname tương tự CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files từ folder 'dist'
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// ✅ FIX ở đây: dùng regex thay vì '/*'
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
