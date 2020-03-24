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