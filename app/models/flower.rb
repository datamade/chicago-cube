class Flower < ActiveRecord::Base
  attr_accessible :name, :address, :latitude, :longitude
  validates_presence_of :name, :address

  def tag
    "chicago-cube-#{id}"
  end
end
