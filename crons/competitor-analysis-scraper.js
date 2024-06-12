const cron = require('node-cron');
const axios = require('axios');

// Schedule tasks to be run on the server.
cron.schedule('*/1 * * * *', async () => {
    var response;
  try {
    console.log('----------------get analytics---------------------')
    response = await axios.get('http://localhost:3000/competitor-analysis-scraper/api/pages/get-analytics?url=https://youcan.shop');
    console.log('API triggered successfully:', response.data);
  } catch (error) {
    console.error('Error triggering API:', response.data);
  }
});
