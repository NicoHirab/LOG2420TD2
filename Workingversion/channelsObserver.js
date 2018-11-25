class ChannelObserver {
    constructor() {
        this.obss = [];
    }
    add(e) {
    	console.log("Adding");
        this.obss.push(e)
    }
    remove(e) {
        this.obss = this.obss.filter(subscriber => subscriber !== e)

    }
    notifyAll(data) {
    	console.log("notify");
        this.obss.forEach(observer => observer(data))
    }
}


const updateP2 = createChannel;
const ob2 = new ChannelObserver();
ob2.add(updateP2);





function myFunction() {
    var txt;
    var person = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }


    return person;
}



var add_channel = document.getElementById("add-channel");

add_channel.addEventListener("click", e => {	
    var us = myFunction();
    console.log("asdkasjhdkjashdjashdjasbdjhasdjhbashjdbashjdbhajsdjhasbdhjasd");
 	ob2.notifyAll(us);		 
 	console.log("add channel");
});




