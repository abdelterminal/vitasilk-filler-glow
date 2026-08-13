import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.2"],

  /*
   * Emit `.next/standalone` — a self-contained `server.js` plus only the
   * node_modules the build actually traced. The Docker runtime stage copies
   * that folder instead of running an install, which is what keeps the final
   * image small and means the runtime never needs a package manager.
   *
   * The standalone server deliberately does NOT include `public/` or
   * `.next/static`; both are copied in alongside it by the Dockerfile.
   */
  output: "standalone",

  /*
   * `sharp` is what next/image uses to optimise at request time, and it is an
   * *optional* dependency of next rather than a direct one. File tracing does
   * not reliably follow an optional native dependency into the standalone
   * bundle, so name it explicitly.
   *
   * Without this the image builds and starts perfectly, then returns 500 on
   * the first optimised image request — which is every image on the page.
   */
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"],
  },
};

export default nextConfig;
