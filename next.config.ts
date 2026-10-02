import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Sin reuniones (pedido de Valeria, 2/10/2026): la antigua página para
  // agendar lleva al formulario de llamada urgente.
  async redirects() {
    return [
      { source: "/schedule", destination: "/call", permanent: true },
      { source: "/es/schedule", destination: "/es/call", permanent: true },
    ];
  },
};

export default nextConfig;
