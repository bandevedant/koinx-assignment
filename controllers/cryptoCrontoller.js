const Crypto = require("../models/crypto");

const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance =
    prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
    prices.length;
  return Math.sqrt(variance).toFixed(2);
};

// Controller to handle /stats API
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!["bitcoin", "matic-network", "ethereum"].includes(coin)) {
    return res.status(400).json({ message: "Invalid coin specified." });
  }

  try {
    const cryptoData = await Crypto.findOne({ name: coin });

    if (!cryptoData) {
      return res
        .status(404)
        .json({ message: "Data not found for the specified coin." });
    }

    // Extract prices from the prices array
    const prices = cryptoData.prices;

    return res.json({
      latest: {
        price: prices[prices.length - 1].price,
        marketCap: prices[prices.length - 1].marketCap,
        change24h: prices[prices.length - 1].change24h,
        // stdDev: stdDev
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Controller to handle /deviation API
const getCryptoDeviation = async (req, res) => {
  const { coin } = req.query;

  // Validate the coin parameter
  const validCoins = ["bitcoin", "ethereum", "matic-network"];
  if (!coin || !validCoins.includes(coin)) {
    return res.status(400).json({ error: "Invalid or missing coin parameter" });
  }

  try {
    // Fetch the cryptocurrency document for the requested coin
    const cryptoData = await Crypto.findOne({ name: coin })
      .select("prices") // Only select the prices array
      .sort({ "prices.timestamp": -1 }) // Sort by most recent timestamp
      .limit(1); // Limit to the latest record

    if (!cryptoData || !cryptoData.prices || cryptoData.prices.length === 0) {
      return res
        .status(404)
        .json({ error: "Not enough data for the requested coin" });
    }

    // Extract the last 100 price records from the prices array as asked
    const prices = cryptoData.prices.slice(-100).map((record) => record.price);

    if (prices.length === 0) {
      return res
        .status(404)
        .json({ error: "Not enough data for the requested coin" });
    }

    // Calculating standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the standard deviation
    res.json({ deviation });
    
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCryptoStats,
  getCryptoDeviation,
};
