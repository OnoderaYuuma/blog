/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atmftxmvnbucqwzycpwg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
