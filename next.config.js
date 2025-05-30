/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  }
  
  module.exports = nextConfig