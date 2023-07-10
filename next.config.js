/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverUrl: 'https://ksobrgtkbb.execute-api.us-east-1.amazonaws.com/develop',
  },
}

module.exports = nextConfig
