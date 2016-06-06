var played = [];

$(document).on('ready', function(){

	plyr.setup();
	
	var player = document.querySelector('.plyr');
	
	player.addEventListener('ended', function(event) {

		var player = document.querySelector('.plyr').plyr;
		videoController.updateVideo(player);

	});
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
			this.removeJustPlayed();

		}else{

			return false;
		};
	},

	removeJustPlayed : function(){
		playlist.shift();
	},
};