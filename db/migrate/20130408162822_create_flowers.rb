class CreateFlowers < ActiveRecord::Migration
  def change
    create_table :flowers do |t|
      t.string :name
      t.string :address
      t.float  :latitude
      t.float  :longitude
      t.timestamps
    end
  end
end
