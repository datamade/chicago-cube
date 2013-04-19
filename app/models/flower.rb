class Flower < ActiveRecord::Base
  attr_accessible :name, :address, :latitude, :longitude
  validates_presence_of :name, :address

  def tag
    "chicagocube#{id}"
  end

  def instagram_photos
    Rails.cache.fetch(tag, :expires_in => 5.minutes) do
      Instagram.tag_recent_media(tag)
    end
  end

end
