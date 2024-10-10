const axios = require('axios');
require('dotenv').config()

const fetchCryptoData = async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets';
  const params = {
    ids: 'bitcoin,matic-network,ethereum',
    vs_currency: 'usd',
  };
  const headers = {
    'x-cg-demo-api-key': process.env.API_KEY,  
  };
  try {
    const response = await axios.get(url, { params,headers });
    // console.log(response.data)
    // console.log("Hello")
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
    return null;
  }
};

module.exports = { fetchCryptoData };
