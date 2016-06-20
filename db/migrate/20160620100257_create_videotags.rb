class CreateVideotags < ActiveRecord::Migration
  def change
    create_table :videotags do |t|

      t.timestamps null: false
    end
  end
end
