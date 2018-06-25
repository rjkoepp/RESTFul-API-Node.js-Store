const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; 

// pass listener 
const server = http.createServer(app); // express app qualifies as request handler

// listens to port, and uses whatever listen function we pass
server.listen(port); 