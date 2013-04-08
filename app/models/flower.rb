class Flower < ActiveRecord::Base
  attr_accessible :name, :address, :latitude, :longitude

  def tag
    "chicago-cube-#{id}"
  end
end
