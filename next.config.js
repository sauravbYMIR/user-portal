module.exports = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: '',
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drfasttrackno-dev.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drfasttrack-dev.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    BANK_CLIENT_SECRET: process.env.NEXT_PUBLIC_BANK_CLIENT_SECRET,
    BANK_CLIENT_ID: process.env.NEXT_PUBLIC_BANK_CLIENT_ID,
  },
};
