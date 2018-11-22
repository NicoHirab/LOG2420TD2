function dateFormat(data){
var days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
var d = new Date(data);
var Day= days[d.getDay()-1];
var date= Day+' '+ d.getDate()+', '+ d.getHours()+':'+d.getMinutes();
return date;
}

document.getElementById("demo").innerHTML = dateFormat("2018-11-22T19:56:48.873Z");

function popUp


function ShowMessage(message,user,time,sender) {
    if(sender){
      document.getElementById("boiteDeMessage").innerHTML+='<div class="othersName">'+user+'<p class"othersText">'+message+'</p></div>'
    }
    else {
      document.getElementById("boiteDeMessage").innerHTML+='<p class"sender">'+message+'</p></div>'
    }

    output.appendChild(pre);
}
