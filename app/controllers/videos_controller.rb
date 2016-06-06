class VideosController < ApplicationController

	skip_before_action :verify_authenticity_token,	only: [:create]
	before_filter :cors_preflight_check, only: [:create]
  	after_filter :cors_set_access_control_headers, only: [:create]

	def index
		video_list = Video.main_videos

		@video = video_list[0]
		@playlist = video_list[1].to_json

		render 'index'
	end

	def create
		Video.addvideo(video_params)
		head :ok
	end

	def cors_set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
		headers['Access-Control-Request-Method'] = '*'
		headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	end

	def cors_preflight_check
		if request.method == :options
			headers['Access-Control-Allow-Origin'] = '*'
			headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
			headers['Access-Control-Request-Method'] = '*'
			headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		    render :text => '', :content_type => 'text/plain'
		end
	end

	private
	def video_params
		params.require(:video).permit(:title, :url, :media_id, :provider)	
	end

end
