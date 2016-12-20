class LocationsController < ApplicationController

  def index
    @locations = Location.all
  end

  def show
    location = Location.find(params[:id])
    
    @data = {
      location: location,
      rooms: location.rooms,
      machines: location.machines,
      quanta: location.quanta
    }

  end
  
end
