const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000' , credentials :  true}));

//Routes
const eventsRoute = require('./routes/events');
app.use('/api/events', eventsRoute);

app.get('/api', (req,res) => {
    res.send("Home page");
});

//Connects to MongoDB Atlas database
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database.')
);

app.listen(5000);