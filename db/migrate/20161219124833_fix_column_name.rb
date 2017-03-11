class FixColumnName < ActiveRecord::Migration[5.0]
  def change
  	rename_column :machines, :type, :machine_type
  end
end
