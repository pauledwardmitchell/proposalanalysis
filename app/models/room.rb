class Room < ApplicationRecord
  has_many :machines
  belongs_to :location
end
