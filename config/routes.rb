Rails.application.routes.draw do
  resources :locations
  resources :records
  resources :rooms
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
