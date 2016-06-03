class AddPublicationDateToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :publication_date, :date
  end
end
