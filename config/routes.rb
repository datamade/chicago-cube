ChicagoCube::Application.routes.draw do

  # redirects
  match '/form' => redirect('/flower/new')

  get '/flower/new' => 'flowers#new'
  post '/flower/new' => 'flowers#create'
  match '/flower/:id' => 'flowers#show'

  get "/about" => 'home#about'
  root :to => 'home#index'
end
