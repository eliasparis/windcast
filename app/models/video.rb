class Video < ActiveRecord::Base

	has_many :videotags
  	has_many :tags, through: :videotags
  	validates :url, uniqueness: true

	def self.addvideo params, tagIds

		publication_date = Video.new.publication_builder

		video = Video.create(
				title: params[:title], 
				url: params[:url], 
				media_id: params[:media_id], 
				provider: params[:provider],
				thumbnail: params[:thumbnail],
				author: params[:author],
				author_url: params[:author_url],
				publication_date: publication_date)

		tagIds.each do |tag|

			tagElm = Tag.find(tag.to_i)
			video.videotags.create(tag: tagElm)
		end

	end

	def self.main_videos
		
		publicables = Video.new.publicables
		videos = []

		videos[0] = publicables[0]
		publicables.to_a.shift 
		videos[1] = publicables

		return videos
	end

	def publicables
		
		return Video.where("publication_date <= ?", Date.today).reverse_order
	end

	def publication_builder

		today = Date.today
		reference = Video.last.publication_date || Date.today

		if reference < today
			return today
		else
			return reference + Random.new.rand(3)
		end
	end

end
