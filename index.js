const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const { signup, login } = require('./controllers/authController');

// Connect to MongoDB database
mongoose.connect("mongodb+srv://wolfemanrock:iNrY2p9e704tcSeN@cluster0.4ynlcgy.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error(error));

const app = express();

// Middleware to parse JSON requests and responses
app.use(express.json());

// Middleware to handle CORS headers
app.use(cors());

// Middleware to parse cookies in the request headers
app.use(cookieParser());

// Route handlers for authentication
app.post('/api/signup', signup);
app.post('/api/login', login);

// Route handlers for protected resources
app.get('/api/users', (req, res) => {
res.json({ message: 'Protected resource accessed by user: ' + req.user.username });
});

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
console.log(`Server started on port`, PORT);
});
