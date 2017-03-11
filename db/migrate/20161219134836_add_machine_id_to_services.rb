class AddMachineIdToServices < ActiveRecord::Migration[5.0]
  def change
  	add_column :services, :machine_id, :integer
  end
end
