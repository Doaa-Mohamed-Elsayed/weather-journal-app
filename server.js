// Setup empty JS object to act as endpoint for all routes
projectData = {      
   
};

// Require Express to run server and routes
const express = require('express'); 
//get zip data
const zips = require("zips");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser') ;
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const  cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,()=>{console.log(`running on website http://localhost:${port}`);});

//--------------Get Data------------------
app.get('/chosenTemp', function (req, res) {
    res.send(projectData);
  });

//----------------Save Data--------------------
app.post('/save', (req,res)=>{
    projectData = {
      temp: req.body.temp,
      date: req.body.date,
      feelings:req.body.feelings
    }
    res.send(projectData);
  } 
  );


  /** -------- get zip country name------------------- */
app.get('/getZipCountry', function (req, res) {
  const country = zips.getByZipCode(req.query.zip);
  res.send(country);
});