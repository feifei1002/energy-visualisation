//Define librairies we are using
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//The index of our API
app.get('/', (req, res) => res.send('index route!'));


//Define port
const port = process.env.PORT || 8082;


//Connect to database
const uri = "mongodb+srv://milliganec:7LY0yFC8F3gfEBCo@climatedata.fh5ht06.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });

    //Tell the user if success
    console.log('MongoDB is Connected...');
  } catch (err) {
    //Else show the error in the console
    console.error(err.message);
    process.exit(1);
  }
};

//Connect to our MongoDB database
connectDB();

//Use cors and express to run server
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

//Test an api route using the test router file
const testRouter = require('./routes/api/test');

//Tell the app to use the test router from route /api/test
app.use('/api/test', testRouter);

//Alert the user the server has started
app.listen(port, () => console.log(`Server running on port ${port}`));
