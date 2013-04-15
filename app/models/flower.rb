class Flower < ActiveRecord::Base
  attr_accessible :name, :address, :latitude, :longitude
  validates_presence_of :name, :address

  def tag
    "chicagocube#{id}"
  end

  def instagram_photos
    photos = Rails.cache.read(tag)
    if photos == nil
      photos = Instagram.tag_recent_media(tag)[0..5]
      Rails.cache.write(tag, photos)
    end

    photos
  end

end
