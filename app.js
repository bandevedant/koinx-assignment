const express = require('express');
const cryptoJob = require('./jobs/cryptoJob');
const cryptoRoutes = require('./routes/cryptoRoutes');
const connectDB  = require('./config/db');

require('dotenv').config()
// MongoDB connection
connectDB();
const app = express();
app.use(express.json());
app.use('/', cryptoRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
