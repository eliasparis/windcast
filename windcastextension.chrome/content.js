//File that is injected on the site matching the manifest
var noembed = "https://noembed.com/embed?url=" + window.location.href;

chrome.runtime.onMessage.addListener(function (msg, sender, response) {

  // First, validate the message's structure. If valid we build de entirely object.

  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

  	var xhr = new XMLHttpRequest();

  	xhr.onreadystatechange = function() {

  		if (xhr.readyState == XMLHttpRequest.DONE ) {

  			if(xhr.status == 200){

  				response(infoBuilder(xhr.responseText));

  			}else if(xhr.status == 400) {

  				alert('There was an error 400')

  			}else{

  				alert('something else other than 200 was returned')

  			};
  		};
  	};

  	xhr.open("GET", noembed, false)
  	xhr.send()

  };
});

function infoBuilder(xhrstring) {
	var info = JSON.parse(xhrstring);
  var media_id = videoIdBuilder(info.url, info.video_id);
	return {
		title: info.title,
		url: window.location.href,
		media_id: media_id,
		provider: info.provider_name.toLowerCase(),
    thumbnail: info.thumbnail_url,
    author: info.author_name,
    author_url: info.author_url,
	}
};

function videoIdBuilder(url, video_id) {
	if (video_id) {
    console.log(video_id);
    return video_id
	}else{
		var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		console.log(videoid[1]);
    return videoid[1];
	};
};