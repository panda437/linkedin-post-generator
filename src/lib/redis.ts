import Redis from 'ioredis'

// Create Redis client with retries and error handling
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null, // Disable max retries per request
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
  reconnectOnError(err) {
    const targetError = 'READONLY'
    if (err.message.includes(targetError)) {
      return true // Only reconnect on READONLY error
    }
    return false
  }
})

redis.on('error', (error) => {
  console.error('Redis connection error:', error)
})

redis.on('connect', () => {
  console.log('Successfully connected to Redis')
})

export async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    const key = `ratelimit:${ip}`
    const limit = 10
    const window = 60 // 1 minute in seconds

    const current = await redis.incr(key)
    if (current === 1) {
      await redis.expire(key, window)
    }

    return current <= limit
  } catch (error) {
    console.error('Rate limit check error:', error)
    return true // Allow request to proceed if Redis is down
  }
}

export default redis;