const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    prices: [{ 
        price: { type: Number, required: true },
        marketCap: { type: Number, required: true },
        change24h: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
