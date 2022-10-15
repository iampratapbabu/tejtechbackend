const express = require('express');
const mongoose  = require('mongoose');
const app = require('./app');

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  });



port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log(`server is running on ${port}`)
});
