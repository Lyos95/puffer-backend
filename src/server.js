const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { fetchConversionRate } = require('./services/conversionRateService');
const cron = require('node-cron');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Fetch Conversion every 5 minutes
cron.schedule('*/5 * * * *', fetchConversionRate);

