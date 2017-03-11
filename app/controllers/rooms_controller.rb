class RoomsController < ApplicationController

  def show
  	@room = Room.find(params[:id])
    @machines = Machine.where(room_id: params[:id])
    render json: @machines
  end

end