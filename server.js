
const projectData = []; //this is the website endpoint that collect data from all routes.
const port = 8000; //the port that the app comunicates on.

// define express.
const express = require('express');

// create the app as an instance of express.
const app = express();

//getting the dependencies.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load cors.
const cors = require('cors');
app.use(cors());

//get the website folder.
app.use(express.static('website'));



// initialize the server and start listening.
const server=app.listen(port,listening());

function listening(){
    console.log("server started at port: "+port);
}

app.get('/data',getProjectData);

function getProjectData(req,res){
    res.send(projectData[0]);
    projectData.splice(0,1);//this removes data after sending it to allow new data entry.
}


app.post('/addData',addData);

function addData(req,res){
    projectData.push(req.body);
    console.log(projectData);
}