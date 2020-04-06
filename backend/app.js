const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pangolinRoutes = require('./routes/pangolin');


const app = express();

mongoose.connect('mongodb+srv://0000:0000@cluster0-e7uwg.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use('/api/pangolins', pangolinRoutes);


module.exports = app;
