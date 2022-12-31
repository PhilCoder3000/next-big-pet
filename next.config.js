const nextConfig = {
  webpack: config => {
    config.externals = [...(config.externals || []), '.prisma/client'];
    return config;
  },
};

module.exports = nextConfig;
