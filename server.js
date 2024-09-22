const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = require('./app');

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, 'config.env') });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    dbName: `tejtechdb`,  //either we can specify db name here or we can put it in connection string here wil be checked first
    //#mongodb+srv://tejpratap:tejtech@cluster0.qmxv4cn.mongodb.net/===>tejtech_prod<===?retryWrites=true&w=majority
    //if we didn't specify any it will create a db with name of test
  })
  .then(() => {
    console.log("DB Connection Success");
  }).catch(err => {
    console.log("ERR CONNECTING DATABASE", err);
  });



const port = process.env.PORT || 8000;
const host = `http://127.0.0.1:`
app.listen(port, () => {
  console.log(`Server is UP and Running on ${host}${port}`)
});
