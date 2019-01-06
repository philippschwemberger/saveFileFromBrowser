/*
This is the application's server part
Setting up a HTTP server and establishing a connection btw server and clietn.
*/

//setting up a server
var express = require('express');
var app = express();                    //initializes app to be a function handler
var http = require('http');
var server = http.createServer(app);    //supply the function handler to an HTTP server 
var io = require('socket.io').listen(server);

var portNr = '8080';
server.listen(portNr);                    //HTTP server listens on port defined in config folder, set to 8080

//writing files on disk
fs = require('fs')

//handing the dir of main.js files to the browser  (if it is in the same dir as the server.js file)

app.use(express.static('../saveFileFromBrowser')); //move up one directory and then the dir the file is in -> main directory
//if my main.js file is not in another directory (= same dir as server.js) I use this method --> the main directory name is not allowed to be changed!!!


//if the main.js file is in another dir, eg: 'linkedScripts' i can use this:
//var path = require('path');
//app.use(express.static(path.join(__dirname, 'linkedScripts')));   

//SERVE a whole folder:
//serve files from a folder (eg music from the folder public)
/* app.use(express.static(__dirname + '/public')); */

 //define a route handler '/'  - the route handler get's hit when the website home is hit
app.get('/', function(req, res){    //GET request on homepage
  res.sendFile(__dirname + '/index.html');  //serves the index file to the browser
});




io.sockets.on('connection', function (socket) {
  console.log('Connected');

  //socket is the argument in the callback function
  socket.on('saveJSON', function(data){   //listen for data from the client side, 'saveJSON' is the customEventsName, `data` is the data to be sent
    //console.log(data)

    dataasJSON = JSON.stringify(data)

    fs.writeFile("./test.json", dataasJSON, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    })
  })

  //emitting an event:
  //socket.emit('customEvent', data)    or   io.sockets.emit('customEvent',data) //not sure which one it is

})

