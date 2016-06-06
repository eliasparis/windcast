var mainTitle;
var	nextTitle;
var nextThumb;

$(document).on('ready', function(){

	//Plyr variables and events subcriptions
	plyr.setup();
	
	var player = document.querySelector('.plyr');
	var player_el = document.querySelector('.plyr').plyr;
	var nextButton = document.getElementById('next_video');
	
	player.addEventListener('ended', function(event) {

		videoController.updateVideo(player_el);
	});

	nextButton.addEventListener('click', function(event) {

		videoController.updateVideo(player_el);
	});

	//Ui elements
	mainTitle = $("#main_title");
	nextTitle = $("#next_title");
	nextThumb = $("#next_thumb");
});

var videoController = {

	updateVideo: function(context){
		
		if (playlist[0]) {

			var nextVideo = playlist[0];
			var sourceObj = {
				type: 'video',
				title: nextVideo.title,
				sources: [{
					src: nextVideo.media_id,
					type: nextVideo.provider
				}]
			}

			context.source(sourceObj);
			playListManager.updatePLaylist(true);
		}else{

			return false;
		};
	},
};

var playListManager = {

	updatePLaylist : function(fromNext){

		if (fromNext) {
			this.addPrevious();
			this.removeJustPlayed();
		};

		uiManager.updateUi();
	},
	
	addPrevious: function(){
		playlist_shadow.unshift(playlist[0]);
	},

	removeJustPlayed : function(){
		playlist.shift();
	},
};

var uiManager = {

	updateUi: function(){
		var mainData = playlist_shadow[0];
		var nextData = playlist[0];
		this.updateMain(mainData);
		this.updateNext(nextData);
	},

	updateMain: function(data){
		mainTitle.text(data.title);
	},

	updateNext: function(data){
		nextTitle.text(data.title);
		nextThumb.attr('src', data.thumbnail);
	},
};