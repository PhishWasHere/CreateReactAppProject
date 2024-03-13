/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_URI: process.env.API_URI
  }
};

export default nextConfig;
