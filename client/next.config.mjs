/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

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
            }
        ]
    },
    webpack: (config) => {
        config.resolve.alias['@appTypes'] = path.resolve(__dirname, './../packages/dist/index.d.ts');
        return config;
    }
}

export default nextConfig
