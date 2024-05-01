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
    ],
  },
  // env: {
  //   BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  // },
};
