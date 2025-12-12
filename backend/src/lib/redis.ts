import { createClient } from 'redis';

// Use environment variables for production
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis. This is an async operation.
// We can wrap this in a function to ensure connection before the server starts.
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis!');
  } catch (error) {
    console.error('Could not connect to Redis:', error);
    // Exit the process if Redis connection is critical for your app
    process.exit(1); 
  }
};

// Call connectRedis in your main server entry file (e.g., index.ts or app.ts)
// before you start the Express server.

export { redisClient, connectRedis };