import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { withContentCollections } from "@content-collections/next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  // Enable View Transitions API
  experimental: {
    viewTransition: true,
  },
};

export default withContentCollections(withVanillaExtract(nextConfig));
