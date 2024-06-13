// server.js (or wherever you define your Next.js API routes)

const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const app = express();
const host = process.env.HOST;

let job = null;
// Cron job logic
const runCronJob = async () => {
  try {
    const site = await axios.get(host+'/competitor-analysis-scraper/api/site/get-working-site');
    const response = await axios.get(host+'/competitor-analysis-scraper/api/pages/get-analytics?url='+site.data.site);
    //console.log('API triggered successfully:', response.data);
  } catch (error) {
   // console.error('Error triggering API:', error.response.data);
    if (error.response.data?.stopcron == true) {
      stopCron();
    }
  }
};

const stopCron = () => {
    if (job) {
      job.stop();
      job = null;
      //console.log('Cron job stopped.');
    }
};

// Start the cron job immediately when the server starts
runCronJob();

// Define API routes for starting and stopping the cron job
app.get('/api/competitor-analysis-scraper/start-cron', (req, res) => {
  if (!job) {
    job = cron.schedule('*/1 * * * *', runCronJob);
    res.status(200).json({ message: 'Cron job started' });
  } else {
    res.status(400).json({ message: 'Cron job is already running' });
  }
});

app.get('/api/competitor-analysis-scraper/stop-cron', (req, res) => {
  if (job) {
    job.stop();
    job = null;
    res.status(200).json({ message: 'Cron job stopped' });
  } else {
    res.status(400).json({ message: 'No cron job is running' });
  }
});






// Start the Express server
const PORT = 3001; // or any other port you prefer
app.listen(PORT, () => {
  console.log(`competitor-analysis-scraper cron running on port ${PORT}`);
});



