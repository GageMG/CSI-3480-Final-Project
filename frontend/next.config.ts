import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Config options here */
  reactCompiler: true,
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.wasm$/,
      loader: 'base64-loader',
      type: 'javascript/auto'
    });

    config.module.noParse = /\.wasm$/;
    config.module.rules.forEach((rule: { oneOf: any; }) => {
      (rule.oneOf ?? []).forEach((oneOf: { loader: string | string[]; exclude: RegExp[]; }) => {
        if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }));
    
    return config;
  }
};

export default nextConfig;
