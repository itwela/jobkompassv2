/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config) => {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    
    // Keep existing alias configurations
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
      "sharp$": false,
      "onnxruntime-node$": false,
    };
    
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      })
    );
    
    return config;
  },
};

export default nextConfig;