import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoute.js';

const app = express();
app.set('view engine', 'ejs');
// Parse JSON bodies (for API clients)
app.use(express.json());
// Parse URL-encoded bodies (for HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// Debug middleware: log method, path, content-type and parsed body
app.use((req, res, next) => {
  console.log('REQ LOG:', req.method, req.path, 'Content-Type:', req.headers['content-type'], 'Parsed body:', req.body);
  next();
});

app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
