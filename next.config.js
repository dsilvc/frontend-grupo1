/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    serverUrl: process.env.SERVER_URL,
  },
}

module.exports = nextConfig
