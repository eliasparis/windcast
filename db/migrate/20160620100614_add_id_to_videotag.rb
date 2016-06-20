class AddIdToVideotag < ActiveRecord::Migration
  def change
    add_column :videotags, :video_id, :integer
    add_column :videotags, :tag_id, :integer
  end
end