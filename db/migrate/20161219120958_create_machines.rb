class CreateMachines < ActiveRecord::Migration[5.0]
  def change
    create_table :machines do |t|
      t.string :type
      t.string :model_year
      t.integer :washco_no
      t.integer :room_id

      t.timestamps
    end
  end
end
