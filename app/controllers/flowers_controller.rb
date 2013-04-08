class FlowersController < ApplicationController

  def new

  end

  def show
    @flower = Flower.where("id = #{params[:id]}").first
  end

end
