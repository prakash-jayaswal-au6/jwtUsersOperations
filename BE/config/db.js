const mongoose = require('mongoose');

const {
  MONGO_USERNAME = 'admin',
  MONGO_PASSWORD = 'secret',
  MONGO_HOST = 'localhost',
  MONGO_PORT = 27017,
  MONGO_DATABASE = 'biz2credit',
} = process.env


const MONGODB_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(
    MONGO_PASSWORD
  )}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`


  mongoose.connect( MONGODB_URI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });