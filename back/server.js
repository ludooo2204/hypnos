const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const config = require("./app/config/db.config");
const mysql = require('mysql2/promise');

console.log("coucou")
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



mysql.createConnection({
    user     : config.USER,
    password : config.PASSWORD
}).then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.DB};`);
})
.then(()=>{
// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();

//   function initial() {
 
   
  
   
//     Role.create({
//       id: 1,
//       name: "user"
//     });
//     Role.create({
//       id: 2,
//       name: "manager"
//     });
//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }
// });






// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);




})







// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});










