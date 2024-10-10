const cron = require('node-cron');
const Crypto = require('../models/crypto');
const { fetchCryptoData } = require('../services/cryptoService');

const saveCryptoData = async () => {
  const data = await fetchCryptoData();

  if (data) {
      for (const coin of data) {
          const cryptoData = {
              price: coin.current_price,
              marketCap: coin.market_cap,
              change24h: coin.price_change_24h,
              timestamp: Date.now() 
          };

          await Crypto.findOneAndUpdate(
              { name: coin.id }, // Match the document by coin name
              { 
                  $push: { prices: cryptoData }, // Append to the prices array
              },
              { upsert: true, new: true }
          );
      }
      console.log('Crypto data updated');
  } else {
      console.error('No data fetched from CoinGecko');
  }
};


// saveCryptoData();//trying while coding
cron.schedule('0 */2 * * *', saveCryptoData);
