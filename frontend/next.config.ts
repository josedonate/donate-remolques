const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/miniaturasRemolques/**',
      },
    ],
  },
}

export default nextConfig
