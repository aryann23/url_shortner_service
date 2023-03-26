const express = require('express');

//importing the DB function
const connectDB = require ('./config/db'); 

const app = express();

//connect to database
connectDB();

//middleware
//allows us to accept JSON data in our API
app.use(express.json({ extended: false }));

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on PORT: ", PORT);
})
