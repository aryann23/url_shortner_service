const mongoose = require('mongoose');
const config = require('config');

//grab db values from json file
const db = config.get('mongoURI');

//use of async as mongoose uses promises
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log("MongoDB connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
