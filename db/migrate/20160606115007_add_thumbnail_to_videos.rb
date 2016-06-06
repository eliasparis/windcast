class AddThumbnailToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :thumbnail, :string
    add_column :videos, :author, :string
    add_column :videos, :author_url, :string
  end
end
