class MessageObserver {
    constructor() {
        this.observers = [];
    }
    add(e) {
    	console.log("Adding");
        this.observers.push(e)
    }
    remove(e) {
        this.observers = this.observers.filter(subscriber => subscriber !== e)

    }
    notifyAll(data) {
    	console.log("notify");
        this.observers.forEach(observer => observer(data))
    }
}




const updateP1 = sendMessage;

const ob = new MessageObserver();

ob.add(updateP1);

var input = document.getElementById("Envoyer");


input.addEventListener("click", e => {
	e.preventDefault();

    ob.notifyAll(document.getElementById("userInput").value);


});

var input2 = document.getElementById("userInput");


input2.addEventListener("keyup", e => {
	if (e.keyCode === 13) {
		 ob.notifyAll(e.target.value);
		input2.value = "";
		 	
 	}
 	
});

var like_btn = document.getElementById("pouce");

like_btn.addEventListener("click", e => {	
 	ob.notifyAll("👍");		 
 	console.log("like");
});


