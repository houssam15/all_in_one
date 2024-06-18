const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Serve static files from multiple directories
  fs.readdirSync(path.join(__dirname , "app")).forEach(module => {
    const asset = path.join(path.join(__dirname , "app") , module , 'view' , 'assets')
    if(fs.existsSync(asset)) server.use(`/${module}/assets`, express.static(asset));
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    //console.log(`> Ready on http://localhost:${port}`);
  });
});
