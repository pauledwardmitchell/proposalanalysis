class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change

    change_table :services do |t|
      t.remove :machine_id
    end

  end
end
