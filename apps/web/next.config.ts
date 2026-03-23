// TODO: Re-enable when dotenv CJS issue with Node.js v24 is fixed
// import "@full-stack-nextjs/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
};

export default nextConfig;
