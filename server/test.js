import express from 'express';
import cors from 'cors';

const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Simple route to test
app.post("/api/user/signin", (req, res) => {
  res.status(200).json({ message: 'Signin successful' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
