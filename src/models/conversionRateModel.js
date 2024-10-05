const mongoose = require('mongoose');

const conversionRateSchema = new mongoose.Schema({
    conversionRate: { type: mongoose.Decimal128, required: true },
    supply: { type: String, required: true },
    assets: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('ConversionRate', conversionRateSchema);