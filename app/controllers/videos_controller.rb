class VideosController < ApplicationController

	skip_before_action :verify_authenticity_token,	only: [:create]
	before_filter :cors_preflight_check
  	after_filter :cors_set_access_control_headers

	def index
		@videos = Video.all
		render 'index'
	end

	def create
		Video.create(title: params[:title],url: params[:url] ,media_id: params[:media_id]  ,provider: params[:provider_name])
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

end
