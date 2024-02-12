/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'c8.alamy.com',
          },
          {
            protocol: 'https',
            hostname: 'media.npr.org',
          },
          {
            protocol: 'https',
            hostname: 'media.vanityfair.com',
          },
          {
            protocol: 'https',
            hostname: 'los40.com',
          },
          {
            protocol: 'https',
            hostname: 'i.blogs.es',
          }
        ],
    },
};

export default nextConfig;
