class Flower < ActiveRecord::Base
  attr_accessible :name, :address, :latitude, :longitude
  validates_presence_of :name, :address

  def tag
    "chicagocube#{id}"
  end

  def instagram_photos
    Instagram.tag_recent_media(tag)[0..5]
  end

end
