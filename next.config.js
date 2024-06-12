module.exports = {
    webpack: (config , {isServer}) => {
      config.resolve.fallback = { fs: false };
      if(isServer){
        require("./crons/competitor-analysis-scraper.js");
      }
      return config;
    },
};