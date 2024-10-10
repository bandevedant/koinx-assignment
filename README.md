# Cryptocurrency Data Fetcher

This project is a Node.js application that fetches cryptocurrency market data from the CoinGecko API every two hours and stores it in a MongoDB database. It provides endpoints to retrieve the latest price statistics and calculate the standard deviation of historical prices for Bitcoin, Ethereum, and Matic Network.

## Use Cases

- **Real-time cryptocurrency tracking**: Users can fetch the latest market data for specific cryptocurrencies.
- **Statistical analysis**: Users can retrieve the latest price, market cap, and 24-hour change for a selected cryptocurrency.
- **Historical price analysis**: Users can calculate the standard deviation of historical prices to assess price volatility.

## Project Structure

- **`models/crypto.js`**: Contains the Mongoose schema for the cryptocurrency data.
- **`services/cryptoService.js`**: Includes the function to fetch cryptocurrency data from the CoinGecko API.
- **`controllers/cryptoController.js`**: Contains the logic for handling API requests related to cryptocurrency statistics and deviations.
- **`jobs/cryptoJob.js`**: Manages scheduled tasks to fetch and save cryptocurrency data periodically.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or use a cloud service)
- API key for CoinGecko (optional for the demo API; not required for fetching data)

### Installation

1. Clone the repository:
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:

   ```plaintext
   API_KEY=your_coin_gecko_api_key
   MONGO_URI=
   PORT=
   ```

4. Ensure MongoDB is running. Update the database connection string in your code if necessary.

### Running the Application

1. Start the application:

   ```bash
   node app.js
   ```

   (Make sure to have a file like `app.js` that initializes your server.)

2. The application will now fetch cryptocurrency data every two hours and store it in the MongoDB database.

### API Endpoints

- **GET /stats?coin={coin}**
  - Retrieves the latest market data for the specified cryptocurrency.
  - **Parameters:**
    - `coin`: Must be one of `bitcoin`, `matic-network`, or `ethereum`.

- **GET /deviation?coin={coin}**
  - Calculates and retrieves the standard deviation of the last 100 price records for the specified cryptocurrency.
  - **Parameters:**
    - `coin`: Must be one of `bitcoin`, `matic-network`, or `ethereum`.

### Example Requests

1. Get stats for Bitcoin:

   ```http
   GET http://localhost:3000/stats?coin=bitcoin
   ```

2. Get standard deviation for Ethereum:

   ```http
   GET http://localhost:3000/deviation?coin=ethereum
   ```
   Adding Screenshots from postman testing :
   ![image](https://github.com/user-attachments/assets/4a8a774f-2726-428c-9d27-9a7ed2a7b625)
   ![image](https://github.com/user-attachments/assets/905c830c-817c-44ca-896c-977fbd37d07f)
   ![image](https://github.com/user-attachments/assets/6deceb6c-8e2d-41b3-b60f-2ab5493ea91a)



---
