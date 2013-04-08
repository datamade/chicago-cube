ChicagoCube::Application.routes.draw do

  get 'flower/new' => 'flowers#new'
  post 'flower/new' => 'flowers#create'
  match 'flower/:id' => 'flowers#show'

  get "about" => 'home#about'
  root :to => 'home#index'
end
