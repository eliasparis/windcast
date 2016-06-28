var button;
var object;
var tags = [];
var tagsAlready = [];

document.addEventListener("DOMContentLoaded", function(event) {

	// Query looking for the desired tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
	    // Sendind a message to the queried window
	    chrome.tabs.sendMessage(
	    	tabs[0].id,
	    	{from: 'popup', subject: 'DOMInfo'},
	    	//Callback with response data
	        setDOMInfo);
	});
	
	//Get Tags in database caller
	chrome.runtime.sendMessage({from: 'popup', subject: 'allReadytags'}, setDomTags);

	//Adding event to POST button in order to send the right info to WindCast
	button = document.getElementById('post');
	button.addEventListener('click', function(event){
		
		getTags();
		getAlreadyTags();

		chrome.runtime.sendMessage({from: 'popup', subject: 'tags', mensaje: tags});
	});
});

//When Tag are on database we save the video and its related tags
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	
	if ((msg.from === 'bg') && (msg.subject === 'tags ready')) {

		object.tagsIds = msg.mensaje.concat(tagsAlready);

		chrome.runtime.sendMessage({from: 'popup', subject: 'cosas', mensaje: object});
  	};
});

function getTags(){
	
	var tagGroup = document.getElementsByClassName('tag');
	
	for (var i = 0; i <= (tagGroup.length - 1); i++) {
		
		if (tagGroup[i].value != "") {
						
			tags.push({
				name: tagGroup[i].value
			});
		};
	};
};

function getAlreadyTags(){
	
	var tagGroup = document.getElementsByClassName('tagCheck');
	
	for (var i = 0; i <= (tagGroup.length - 1); i++) {
		
		if (tagGroup[i].checked) {
						
			tagsAlready.push(tagGroup[i].value);
		};
	};
};

function setDOMInfo(info) {
	if (info) {
		document.getElementById('not').style.display = "none";
		document.getElementById('form').style.display = "block";
		document.getElementById('title').textContent   = info.title;
		document.getElementById('url').textContent  = info.url;
		document.getElementById('video_id').textContent = info.media_id;
		document.getElementById('provider').textContent = info.provider;
		document.getElementById('thumbnail').textContent = info.thumbnail;
		document.getElementById('author').textContent = info.author;
		document.getElementById('author_url').textContent = info.author_url;

		object = info;
	};
};

function setDomTags(info) {

	var cont = document.getElementById('alreadytags');

	if (info) {
		
		var info = JSON.parse(info);
		
		for (var i = 0; i <= (info.length - 1); i++) {
		
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.name = info[i].name;
			checkbox.value = info[i].id;
			checkbox.id = info[i].id;
			checkbox.classList.add('tagCheck');

			var label = document.createElement('label')
			label.htmlFor = info[i].id;
			label.appendChild(document.createTextNode(info[i].name));

			cont.appendChild(checkbox);
			cont.appendChild(label);
		};
	};
};
