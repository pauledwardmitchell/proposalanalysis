class Machine < ApplicationRecord
  belongs_to :room
  has_many :quanta
  has_many :services
end
