# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# bcg = Location.create(name: 'Boca Grande Club')

# dune = Room.create(name: 'Dune Chalet', location_id: bcg.id)
# beach = Room.create(name: 'Beach Chalet', location_id: bcg.id)
# dumpster = Room.create(name: 'Dumpster Chalet', location_id: bcg.id)

# 6.times do
#   Machine.create(machine_type: 'Washer', model_year: '2016', washco_no: rand(1..1000), room_id: dune.id)
#   Machine.create(machine_type: 'Washer', model_year: '2016', washco_no: rand(1..1000), room_id: beach.id)
#   Machine.create(machine_type: 'Washer', model_year: '2016', washco_no: rand(1..1000), room_id: dumpster.id)
#   Machine.create(machine_type: 'Dryer', model_year: '2016', washco_no: rand(1..1000), room_id: dune.id)
#   Machine.create(machine_type: 'Dryer', model_year: '2016', washco_no: rand(1..1000), room_id: beach.id)
#   Machine.create(machine_type: 'Dryer', model_year: '2016', washco_no: rand(1..1000), room_id: dumpster.id)
# end

# Machine.all.each do |machine|
#   Quantum.create(date: '2016-01-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-01-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-02-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-02-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-03-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-03-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-04-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-04-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-05-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-05-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-06-01', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
#   Quantum.create(date: '2016-06-15', total: [20, 25, 30, 31, 32, 33, 34, 35].sample, machine_id: machine.id)
# end

# 5.times do
# machine = Machine.all.sample
#   Service.create(date: '2016-02-01', description: ['will not drain', 'will not heat', 'busted', 'aint got no gas in it', 'rusty', 'smells like puke'].sample, machine_id: machine.id)
# end

