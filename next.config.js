module.exports = {
    webpack: (config , {isServer}) => {
      config.resolve.fallback = { fs: false };
      if(isServer){
        require("./crons/index.js");
      }
      return config;
    },
};