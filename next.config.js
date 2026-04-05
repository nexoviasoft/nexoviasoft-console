/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // Disabled to ensure static assets (CSS) load correctly
  
  reactStrictMode: true,
  swcMinify: true,
  
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Experimental features for faster builds and performance
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      '@radix-ui/react-icons', 
      'recharts', 
      'framer-motion', 
      'date-fns', 
      'zod', 
      'sonner',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select'
    ],
    reactCompiler: true,
  },
};

module.exports = nextConfig;
