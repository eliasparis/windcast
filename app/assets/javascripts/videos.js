$(document).on('ready', function(){

	var player = plyr.setup();
	
	var player = document.querySelector('.plyr');
	player.addEventListener('ended', function(event) {
		var player = document.querySelector('.plyr').plyr;
	    player.source({
	    	type: 'video',
	    	title: 'aaaa',
	    	sources: [{
	    		src: 'bTqVqk7FSmY',
	    		type: 'youtube'
	    	}]
	    });
	});

});
