class MachinesController < ApplicationController

  def show
    machine = Machine.find(params[:id])

    @data = {
      machine: machine,
      quanta: Quantum.where(machine_id: machine.id)
    }
  end

end
