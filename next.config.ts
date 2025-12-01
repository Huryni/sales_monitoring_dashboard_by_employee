import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitir acesso de qualquer origem na rede local
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Otimizações para rede local
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
