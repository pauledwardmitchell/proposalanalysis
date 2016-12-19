class Location < ApplicationRecord
  has_many :rooms
  has_many :machines, through: :rooms
  has_many :quanta, through: :machines
  has_many :services, through: :machines
end
