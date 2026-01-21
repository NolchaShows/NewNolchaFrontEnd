/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // R2 buckets used for Nolcha media
      "pub-3dc8ce9c3aeb451d8c5fe66c623ea48c.r2.dev",
      "pub-7c963537a4c84ccc92f79577a2d14fb7.r2.dev",
    ],
  },
};

export default nextConfig;
