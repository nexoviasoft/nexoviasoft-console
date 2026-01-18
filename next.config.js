/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Disabled to ensure static assets (CSS) load correctly
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Experimental features for faster builds
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
