var polychat = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=mike");


polychat.onopen = function(event) {
	 console.log(event)
	};

polychat.onmessage = function(event){
	console.log(event);

};


//Send 

function sendText() {

	console.log("Something");
  var msg = {
    eventType: "onMessage",
    channelId : "f7523f0d-5893-43ee-aed6-eccafeea06d2",
    data: "Hello World!",
    sender: "mike",  
    date: new Date(Date.now()),

  };

  console.log(JSON.stringify(msg));
  polychat.send(JSON.stringify(msg));


  
};




//Receive
polychat.onmessage = function(event) {
  var f = document.getElementById("chatbox").contentDocument;
  var text = "";
  var msg = JSON.parse(event.data);
  
  switch(msg.eventType) {
    case "onMessage":
      
		break;
		case "onCreateChannel":
		break;
		case "onJoinChannel":
		break;
		case "onLeaveChannel":
		break;
		case "updateChannelsList":
		break;
		case "onError":
		break;

   
  }
  
  if (text.length) {
    f.write(text);
    document.getElementById("chatbox").contentWindow.scrollByPages(1);
  }
};










