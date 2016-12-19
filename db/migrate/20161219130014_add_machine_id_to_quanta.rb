class AddMachineIdToQuanta < ActiveRecord::Migration[5.0]
  def change
  	add_column :quanta, :machine_id, :integer
  end
end
