// server.js (or wherever you define your Next.js API routes)

const express = require('express');
const cron = require('node-cron');
const axios = require('axios');
const cors = require('cors'); 
const app = express();

const socketIo = require('socket.io');
const server = require("http").createServer(app);
const io = socketIo(server , {
  cors:{
    origin:process.env.HOST,
    methods:["GET" , "POST"]
  }
});

const host = process.env.HOST;

let job = null;
const sockets = new Map(); // Store connected sockets

// Cron job logic
const runCronJob = async () => {
  try {
    //console.log("cron executed");
    const site = await axios.get(host+'/competitor-analysis-scraper/api/site/get-working-site');
    console.log(site.data)
    const response = await axios.get(host+'/competitor-analysis-scraper/api/pages/get-analytics?url='+site.data.site.url);
     // Notify all connected clients
    sockets.forEach((socket) => {
      socket.emit('analytics-updated', response.data);
    });
  } catch (error) {
    if (error.response?.data?.stopcron == true) {
      stopCron();
    }
  }
};

const stopCron = () => {
    if (job) {
      job.stop();
      job = null;
    }
};

runCronJob();

app.get('/api/competitor-analysis-scraper/start-cron', (req, res) => {
  try{
    if (!job) {
      job = cron.schedule('*/1 * * * *', runCronJob);
      res.status(200).json({status:"OK"});
    } else {
      res.status(200).json({status:"KO"});
    }
  }catch(err){
      res.status(200).json({status:"KO"});
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



io.on('connection', (socket) => {
  //console.log('user connected ',socket.id);
    // Add socket to the map
    sockets.set(socket.id, socket);

    socket.on('disconnect', () => {
     // console.log('user disconnected', socket.id);
      
      // Remove socket from the map
      sockets.delete(socket.id);
    });
});

server.listen(process.env.COMPETITOR_ANALYSIS_SCRAPPER_CRON_PORT||3001, () => {
 // console.log(`competitor-analysis-scraper cron running on port ${PORT}`);
});



