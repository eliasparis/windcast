class Video < ActiveRecord::Base

	def self.addvideo params

		publication_date = Video.new.publication_builder

		Video.create(
				title: params[:title], 
				url: params[:url], 
				media_id: params[:media_id], 
				provider: params[:provider],
				publication_date: publication_date)

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
