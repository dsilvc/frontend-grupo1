/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverUrl: 'https://ia6dtpped3.execute-api.us-east-1.amazonaws.com',
  },
}

module.exports = nextConfig
