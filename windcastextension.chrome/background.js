chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	
	if ((msg.from === 'popup') && (msg.subject === 'cosas')) {

  		console.log(msg.mensaje);

  		var xhr = new XMLHttpRequest();

  		xhr.open("POST", 'http://localhost:3000/videos', false);
  		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhr.send(JSON.stringify(msg.mensaje));
  	};
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	
	var tagsIds = [];
	var numTags = 0;
	var send = false;

	if ((msg.from === 'popup') && (msg.subject === 'tags')) {

  		var length = msg.mensaje.length - 1;

  		for (var i = 0; i <= length; i++) {

	  		var xhr = new XMLHttpRequest();

	  		xhr.open("POST", 'http://localhost:3000/tags', false);
	  		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
			xhr.send(JSON.stringify(msg.mensaje[i]));
			
			tagsIds.push(parseInt(xhr.responseText));
			numTags++

			if ((length + 1) === numTags) {

  				chrome.runtime.sendMessage({from: 'bg', subject: 'tags ready', mensaje: tagsIds});
			};  
  		};
  	};
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	
	var tagsIds = [];
	var numTags = 0;
	var send = false;

	if ((msg.from === 'popup') && (msg.subject === 'allReadytags')) {

		var xhr = new XMLHttpRequest();

	  	xhr.onreadystatechange = function() {

	  		if (xhr.readyState == XMLHttpRequest.DONE ) {

	  			if(xhr.status == 200){

	  				response(xhr.responseText);

	  			}else if(xhr.status == 400) {

	  				alert('There was an error 400')

	  			}else{

	  				alert('something else other than 200 was returned')

	  			};
	  		};
	  	};

	  	xhr.open("GET", 'http://localhost:3000/tags', false)
	  	xhr.send()
  	};
});