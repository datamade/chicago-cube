class FlowersController < ApplicationController

  def new
    @flower = Flower.new
  end

  def create
    @flower = Flower.new(params[:flowers])

    require 'geocoder'
    address = @flower.address
    unless address.downcase.include? 'chicago'
      address = "#{address} chicago"
    end
    lat, long = Geocoder.coordinates(address)
    puts "#{@flower.address} => (#{lat}, #{long})"
    @flower.latitude = lat
    @flower.longitude = long 

    if @flower.save
      redirect_to("/flower/#{@flower.id}", :notice => 'Thanks for sharing your flower!')
    else
      render :action => "new"
    end

  end

  def show
    @flower = Flower.where("id = #{params[:id]}").first
  end

end
