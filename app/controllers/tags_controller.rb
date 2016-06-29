class TagsController < ApplicationController

	skip_before_action :verify_authenticity_token,	only: [:create]
	before_filter :cors_preflight_check, only: [:create]
  	after_filter :cors_set_access_control_headers, only: [:create]

	def index
		@tags = Tag.all
		render :json => @tags
	end

	def create
		tag = Tag.create(name: tag_params[:name])
		render :text => tag.id
	end

	def cors_set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
		headers['Access-Control-Request-Method'] = '*'
		headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override'
	end

	def cors_preflight_check
		if request.method == :options
			headers['Access-Control-Allow-Origin'] = '*'
			headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
			headers['Access-Control-Request-Method'] = '*'
			headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override'
		    render :text => '', :content_type => 'text/plain'
		end
	end

	private
	def tag_params
		params.require(:tag).permit(:name)
	end

end
