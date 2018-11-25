// global model
var chatModel = (function() {
    var channels = [];
    var messages = [];
    var username;

    var Channel = function(data) {
        this.data = data;

    };

    var Message = function(data, ch) {
        this.data = data;
        this.channel_name = ch;
    };

    var addChannel = function(content) {
        content.data.forEach(element => {
            var item = new Channel(element);
            channels.push(item);
        });

        //state = channels[0].data.id;
    }


    var addMessage = function(content, channel_name) {

        var item = new Message(content, channel_name);
        messages.push(item);

    }


    var addUserName = function(username) {
        this.username = username;
    }


    return {
        channels: channels,
        Channel: Channel,
        messages: messages,
        Message: Message,
        username,
        username,
        addChannel: addChannel,
        addMessage: addMessage,
        addUserName: addUserName,

    };
})();



function getUsername() {
    var txt;
    var person = prompt("Please enter your name:", "Mpotter");
    return person;
}


s = getUsername();
chatModel.addUserName(s);

// var polychat = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice?username=" + chatModel.username);
var polychat = new WebSocket("ws://inter-host.ca:3000/chatservice?username=" + chatModel.username);

polychat.onopen = function(event) {
    console.log("Successfuly connected");
};

polychat.onmessage = function(event) {
    var text = "";
    var msg = JSON.parse(event.data);
    console.log(msg);
    switch (msg.eventType) {



        case "onGetChannel":

            console.log("Messages");
            console.log(msg.data.messages);
            msg.data.messages.forEach(element => {
                if (msg.sender == chatModel.username) {
                    ShowMessage(msg.data, msg.sender, msg.timestamp, true, msg.channelId);
                } else {
                    console.log("Message.data");
                    console.log(element.data);
                    ShowMessage(element.data, element.sender, element.timestamp, false, element.channelId);
                }
            });
            break;


        case "onMessage":
            // console.log("onMessage");
            // console.log(msg.data,msg.sender,msg.timestamp);
            if (msg.sender == chatModel.username) {
                ShowMessage(msg.data, msg.sender, msg.timestamp, true, msg.channelId);
            } else {
                ShowMessage(msg.data, msg.sender, msg.timestamp, false, msg.channelId);
            }
            // var s = mapper(chatModel.channels, msg.channelId);
            // // console.log("NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            // // console.log(s);
            // // console.log("NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            // chatModel.addMessage(msg, s);
            break;


        case "onCreateChannel":
            // console.log("Create Channel");
            break;

        case "onJoinChannel":

            ShowMessage('<span style="color: blue;"> ' + "A new member has joinded the channel" + '</span>');
            break;

        case "onLeaveChannel":

            ShowMessage('<span style="color: blue;"> ' + "A  member has left need his name the channel" + '</span>');
            break;


        case "onError":

            // console.log("onError ");
            ShowMessage('<span style="color: blue;"> ' + "Error connecting" + '</span>');
            alert(msg.data);
            break;


        case "updateChannelsList":


            console.log("SERVER IS SENDING");
            console.log(msg);

            chatModel.channels.splice(0, chatModel.channels.length);
            chatModel.addChannel(msg);
            CreateGroups(chatModel.channels);
    }
};


var state;
var output;
output = document.getElementById("chatbox");



function sendMessage(msg) {



    // console.log()
    // var msg =  new Message(eventType: "onMessage",channelId: state,data: msg,sender: polychat.username,date: new Date(Date.now()));
    //console.log(JSON.stringify(msg));
    console.log("sENING TOOO ");
    console.log(state);
    var msg =  new Message("onMessage",state, msg, chatModel.username, new Date(Date.now()));
    polychat.send(JSON.stringify(msg));
    //ShowMessage('  <div class="bubble you"> ' + msg.data + '</div>');
    //ShowMessage('  <div class="bubble you"> ' + msg.date + '</div>');

};


function createChannel(name) {

    // console.log("sending.asdasdasd  ...");
    var msg =  new Message("onCreateChannel",null, name, chatModel.username, null);
    polychat.send(JSON.stringify(msg));

};





function ShowMessage(message,user,time,sender,id) {

  //verify if its the same channel

  console.log("wtasddddddddddddddf");
       console.log(id);
       console.log(state);
       let username =  document.createElement("div");
       let usernameMessage= document.createElement("div");
       usernameMessage.textContent= message;
       let timeStamp= document.createElement("div");
       timeStamp.textContent= time;

    if (id == state && sender != chatModel.username){
      username.textContent='';
      username.setAttribute("class","SenderName");
      usernameMessage.setAttribute("class","SenderText");
      timeStamp.setAttribute("class","SendingTimeStamp");
    }
    else {
      username.textContent=user;
      username.setAttribute("class","OthersName");
      usernameMessage.setAttribute("class","ReceiverText");
      timeStamp.setAttribute("class","ReceivingTimeStamp");
    }
      username.appendChild(usernameMessage);
      username.appendChild(timeStamp);
      console.log(username);
    document.getElementById("chatbox").appendChild(username);

}




function JoinGroup(){
    // console.log("Creating....");
    var msg =  new Message("onJoinChannel","8ee7e1a0-ef55-11e8-a887-b10a02c99da1", null,"ana",null);
    //send on GetC
    polychat.send(JSON.stringify(msg));

}





function CreateGroups(data){

    data.slice(chatModel.channels.length);
    var outputs =  document.getElementById("group-list");
    outputs.innerHTML = "";
    counter = 0;
    data.forEach(element => {
        if (element.data.joinStatus == true) {
              var finished_item_HTML =

              '<div style="padding-left:10px;"> <div style="color:#3385ff;padding-left: 15px;position: relative;display:inline;font-weight: 600;width: inherit;font-family:Arial, Helvetica, sans-serif;">'+element.data.name+'</div>' +
              '<div class="" id ="parent">' +
                '<i onclick="getMessages(' + counter + ')" class="fa fa-gear"></i>' +
                '<i onclick="doLeave(' + counter + ')" class="fa fa-minus" aria-hidden="true"'+ ' id= ' +element.data.id + '></i>' +

              '</div>'
              ;


        }

        else {

             var finished_item_HTML =

              '<div style="padding-left:10px;" > <div style="color:#3385ff;padding-left: 15px;position: relative;display:inline;font-weight: 600;width: inherit;font-family:Arial, Helvetica, sans-serif;">'+element.data.name+'</div>' +
              '<div class="" id ="parent">' +
                '<i onclick="doJoin(' + counter + ')" class="fa fa-plus" aria-hidden="true"'+ ' id= ' +element.data.id + '></i>'

              '</div>'
              ;
        }


        outputs.innerHTML += finished_item_HTML;
        counter++;




    });
}


function getMessages(index) {

  console.log("-------------------");
  state = chatModel.channels[index].data.id;
  console.log(state);
  console.log("helper");
  var msg =  new Message("onGetChannel",state);
  polychat.send(JSON.stringify(msg));
  output.innerHTML = "";

}


function doJoin(index){

    output.innerHTML = "";
     state = chatModel.channels[index].data.id;
     console.log("state");
     console.log(state);

     var msg =  new Message("onJoinChannel",chatModel.channels[index].data.id, null,chatModel.username,null);
     console.log(msg);
    polychat.send(JSON.stringify(msg));
}


function doLeave(index){

     var msg =  new Message("onLeaveChannel",chatModel.channels[index].data.id, null,chatModel.username,null);
     console.log(msg);
     polychat.send(JSON.stringify(msg));
}
