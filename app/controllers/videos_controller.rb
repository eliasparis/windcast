class VideosController < ApplicationController

  def index
  	@videos = Video.all
  	render 'index'
  end

end
