class CreateQuanta < ActiveRecord::Migration[5.0]
  def change
    create_table :quanta do |t|
      t.date :date
      t.integer :total

      t.timestamps
    end
  end
end
