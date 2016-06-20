class TagsController < ApplicationController

	skip_before_action :verify_authenticity_token,	only: [:create]

	def index
		@tags = Tag.all
		render :json => @tags
	end

	def create
		tag = Tag.create(name: tag_params[:name])
		render :text => tag.id
	end

	private
	def tag_params
		params.require(:tag).permit(:name)
	end

end
