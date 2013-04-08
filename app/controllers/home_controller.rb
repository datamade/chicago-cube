class HomeController < ApplicationController

  def index
    @flowers = ActiveSupport::JSON.encode( Flower.all )

    # @marker_latlngs = [ ]
    #@flowers.each do |flower|
    #  @marker_latlngs << [ flower.latitude, flower.longitude  ]
    # end
  end

end
