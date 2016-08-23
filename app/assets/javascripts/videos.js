var mainTitle;
var mainAuthor;
var	nextTitle;
var nextThumb;
var nextAuthor;
var previousTitle;
var previousThumb;
var previousAuthor;
var previousAuthorItem;
var nextAuthorItem;
var tagsContainer;

$(document).on('ready', function(){

	//Plyr variables and events subcriptions
	plyr.setup();
	
	var player = document.querySelector('.plyr');
	var player_el = document.querySelector('.plyr').plyr;
	var nextButton = document.getElementById('next_video');
	var previousButton = document.getElementById('prev_video'); 
	
	player.addEventListener('ended', function(event) {
		videoController.updateVideo(player_el, true);
	});

	nextButton.addEventListener('click', function(event) {
		videoController.updateVideo(player_el, true);
	});

	previousButton.addEventListener('click', function(event) {
		videoController.updateVideo(player_el, false);
	});

	//Ui elements
	//Main
	mainTitle = $("#main_title");
	mainAuthor = $("#main_author")
	tagsContainer = $("#tags > ul")
	//Next
	nextTitle = $("#next_title");
	nextThumb = $("#next_thumb");
	nextAuthor = $("#next_author");
	nextAuthorItem = $('#author.next');
	//Previous
	previousTitle = $("#previous_title");
	previousThumb = $("#previous_thumb");
	previousAuthor = $("#previous_author");
	previousAuthorItem = $('#author.previous');
});

var videoController = {

	updateVideo: function(context, next){

		var nextVideo;
		var autoplay;

		if (next) {

			nextVideo = playlist[0];
			autoplay = true;

		}else if(!next && playlist_shadow[1]){
			
			nextVideo = playlist_shadow[1];
			autoplay = false;
		}else{
			
			return false;
		};

		var sourceObj = {
			type: 'video',
			title: nextVideo.title,
			autoplay: autoplay,
			sources: [{
				src: nextVideo.media_id,
				type: nextVideo.provider
			}]
		};

		context.source(sourceObj);
		playListManager.updatePLaylist(next);
	},
};

var playListManager = {

	updatePLaylist: function(fromNext){

		if (fromNext) {
			this.addPrevious();
			this.removeJustPlayed();
		}else{
			this.addNext();
			this.removeLastShadow();
		};

		uiManager.updateUi();
	},
	
	addPrevious: function(){
		playlist_shadow.unshift(playlist[0]);
	},

	removeJustPlayed : function(){
		playlist.shift();
	},

	addNext: function(){
		playlist.unshift(playlist_shadow[0]);
	},

	removeLastShadow: function(){
		playlist_shadow.shift();
	},
};

var uiManager = {

	updateUi: function(){
		var mainData = playlist_shadow[0];
		var nextData = playlist[0];
		var previousData = playlist_shadow[1];
		this.updateMain(mainData);
		this.updateNext(nextData);
		this.updatePrevious(previousData);
	},

	updateMain: function(data){
		mainTitle.text(data.title);
		mainAuthor.text(data.author);

		this.updateMainTags(data.tags);
	},

	updateMainTags: function(tags){
		
		tagsContainer.empty();

		for(var index in tags){
			var tag = $('<li></li>').text(tags[index].name).addClass('tag_element' + (Math.floor(Math.random() * (7 - 1) + 1)));
			tagsContainer.append(tag);
		}
	},

	updateNext: function(data){

		if (playlist[0]) {
			nextTitle.text(data.title);
			nextAuthor.text(data.author);
			nextAuthorItem.removeClass('hidden');
			nextThumb.attr('src', data.thumbnail);
		}else{
			nextTitle.text("NO MORE VIDEOS :(");
			nextThumb.attr('src', '');
			nextAuthorItem.addClass('hidden');
		}
	},

	updatePrevious: function(data){
		
		if (playlist_shadow[1]) {
			previousTitle.text(data.title);
			previousAuthor.text(data.author);
			previousAuthorItem.removeClass('hidden');
			previousThumb.attr('src', data.thumbnail);
		}else{
			previousAuthorItem.addClass('hidden');
			previousThumb.attr('src', "");
			previousTitle.text("NO PREVIOUS VIDEO")
		};
	},
};