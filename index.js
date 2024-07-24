const http = require("http");
// =========================
const path = require('path')
// ========================
const app = require(path.resolve('src', 'app.js'));
// =========================
require("dotenv").config();

const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT;
const server = http.createServer(app);

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is running at http://${HOST_NAME}:${PORT}`);
});
