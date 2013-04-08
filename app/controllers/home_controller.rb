class HomeController < ApplicationController

  def index
    @flowers = Flower.where("latitude IS NOT NULL")
                        .order("created_at DESC").all

    @flowers_json = ActiveSupport::JSON.encode( @flowers )
  end

end
