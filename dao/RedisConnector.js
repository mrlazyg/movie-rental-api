const redis = require('redis');
const config = require('../config/constant');

class RedisConnector {
  static async createConnection() {
    try {
      const client = await redis.createClient({
        url: config.REDIS_URI,
      });
      const rd = await client.connect();
      console.log('Connected to Redis!');

      // Your Redis operations here (e.g., SET, GET, etc.)

      await client.quit(); // Close the connection when done
    } catch (error) {
      console.error('Redis Client Error', error);
    }
  }
}

module.exports = RedisConnector;
