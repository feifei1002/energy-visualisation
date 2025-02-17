//Define librairies we are using in the backend
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


// Define the root route for API
// go to http://localhost:8082/ for backend
app.get('/', (req, res) => res.send('index route!'));

//Define port
const port = process.env.PORT || 8082;


//Get MongoDB password from environment variables
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB URI
const uri = `mongodb+srv://milliganec:${password}@climatedata.fh5ht06.mongodb.net/ClimateData?retryWrites=true&w=majority`;

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    // Use the new URL parser
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });

    // Log a success message WITH THE DATABASE ITS CONNECTED TO
    console.log('MongoDB is connected to database:', mongoose.connection.name);

  } catch (err) {
    //Log an error message and exit with an error code
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

//Connect to the MongoDB database
connectDB();

//Configure CORS and JSON parsing
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

//Import and configure the API routes
const apiRouter = require('./routes/api/Api');
const dataRouter = require('./routes/data/Data');
const csvRouter = require('./routes/api/Csv');
const profileRouter = require('./routes/api/Profile');
const registerRouter = require("./routes/api/Register");
const webAdminRouter = require("./routes/api/Admin");
const contactUsRouter = require("./routes/api/ContactUs");
const loginRouter = require('./routes/api/Login');
const analyticsRouter = require('./routes/api/AnalyticLogs');

app.use('/api', registerRouter);
app.use('/api', apiRouter);
app.use('/data', dataRouter);
app.use('/api',csvRouter);
app.use('/api',profileRouter);
app.use('/api',webAdminRouter);
app.use('/api', contactUsRouter);
app.use('/api',loginRouter);
app.use('/api', analyticsRouter);

//From StackOverFlow: https://stackoverflow.com/questions/41888346/jwt-unauthorizederror-no-authorization-token-was-found-get-request-with-cookie
//ACCESSED: 20/12/2023
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});
//END FROM STACKOVERFLOW

//Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));


