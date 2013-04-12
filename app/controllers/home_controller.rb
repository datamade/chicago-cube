class HomeController < ApplicationController

  def index
    @flowers = Flower.where("latitude IS NOT NULL")
                        .order("created_at DESC").all

    @flowers_photos = [ ]
    @flowers.each do |f|
      @flowers_photos << {
        :id => f.id,
        :name => f.name,
        :address => f.address,
        :latitude => f.latitude,
        :longitude => f.longitude,
        :photos => f.instagram_photos
      }
    end
    @flowers_json = ActiveSupport::JSON.encode( @flowers_photos )

    # @flowers_json = ActiveSupport::JSON.encode( @flowers )
  end

end
