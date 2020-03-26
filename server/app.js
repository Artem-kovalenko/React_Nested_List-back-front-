const express = require('express');
const app = express();
const listElementRoutes = require('./api/routes/listElement');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ListDB',{useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
    if (err) throw err;
    console.log('Successfully connected to ListDB')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    return next();
  });

app.use('/listElement', listElementRoutes)


app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports = app;