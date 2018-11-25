function dateFormat(data){
var days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
var d = new Date(data);
var Day= days[d.getDay()-1];
var date= Day+' '+ d.getDate()+', '+ d.getHours()+':'+d.getMinutes();
return date;
}




// function ShowMessage(message,user,time,sender) {
function ShowMessage(sender){
  let username =  document.createElement("div");
  let usernameMessage= document.createElement("div");
  usernameMessage.textContent= 'message';
  let timeStamp= document.createElement("div");
  timeStamp.textContent= 'time';
  if(sender){
      username.textContent='';
      username.setAttribute("class","SenderName");
      usernameMessage.setAttribute("class","SenderText");
      timeStamp.setAttribute("class","SendingTimeStamp");
    }
    else {
      username.textContent='user';
      username.setAttribute("class","OthersName");
      usernameMessage.setAttribute("class","ReceiverText");
      timeStamp.setAttribute("class","ReceivingTimeStamp");
    }
      username.appendChild(usernameMessage);
      username.appendChild(timeStamp);
      console.log(username);
    document.getElementById("chatBox").appendChild(username);
}
