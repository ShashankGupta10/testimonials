/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'd33wubrfki0l68.cloudfront.net',
                protocol: 'https',
            },
            {
                hostname: 'firebasestorage.googleapis.com',
                protocol: 'https',
            },
            {
                hostname: 'picsum.photos',
                protocol: 'https',
            }
        ]
    },
}

export default nextConfig
