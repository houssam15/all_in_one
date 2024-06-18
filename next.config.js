const withImages = require('next-images');
require('dotenv-expand').expand(
  require('dotenv').config()
);

module.exports = withImages({
  webpack(config, { isServer }) {
    // Resolve 'fs' module fallback
    config.resolve.fallback = { fs: false };

    // Run server-specific code
    if (isServer) {
      require('./crons/index.js');
    }

    return config;
  },
//  images:{
//   remotePatterns:[
//     {
//       protocol: process.env.PROTOCOL,
//       hostname: process.env.HOSTNAME,
//       port:process.env.PORT,
//       pathname:"/**"
//     }
//   ]
//  }
});
