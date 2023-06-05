/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/auth/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5000/auth/:path*'
            : '/auth/',
      },
    ]
  },
}

module.exports = nextConfig
