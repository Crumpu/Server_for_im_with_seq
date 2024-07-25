const http = require("http");
// =========================
const path = require('path')
// ========================
const app = require(path.resolve('src', 'app.js'));
// ========================
const db = require(path.resolve('src', 'db', 'models'))
// =========================
require("dotenv").config();

const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT;
const server = http.createServer(app);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with DB <<<${process.env.DB_NAME.toUpperCase()}>>> has been successfully done`
    );
  } catch (error) {
    console.log("Cannot connect to DB: ", error.message);
  }
};
dbCheck();

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is running at http://${HOST_NAME}:${PORT}`);
});


const syncSomeTable = async () => {
    try {
        await db.sequelize.sync({alter: true});
        console.log('Sync table has been done')
    } catch (error) {
        console.log('Cannot sync table: ', error.message)
    }
}

// syncSomeTable()