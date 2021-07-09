const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

//Connects to MongoDB Atlas database
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database.')
);

app.listen(5000);