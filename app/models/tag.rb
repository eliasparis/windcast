class Tag < ActiveRecord::Base

	has_many :videotags
	has_many :videos, through: :videotags

end
