var socket = io();   //io() creates an instance of socket.io that can emit customEvents to the server
//socket.connect('http://localhost:8080');  //no need to specifying any URL here since it defaults to trying to connect to the host that serves the page.

//listening for events from the server side:
/* socket.on('customEventName', function(data){    //triggered everytime a 'customEvent' comes in
  //do something
  //console.log(data)
}) */


window.onload = function() {
  var button = document.getElementById('saveButton')

  button.onclick = function() {
    console.log('pressed')

    socket.emit('saveJSON', data)
   }
}

var data = {
  name: "Elvis",
  surname: "Presley"
}