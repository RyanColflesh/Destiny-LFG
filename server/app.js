const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
const eventsRoute = require('./routes/events');
app.use('/events', eventsRoute);

app.get('/', (req,res) => {
    res.send("Home page");
});

//Connects to MongoDB Atlas database
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database.')
);

app.listen(5000);