ChicagoCube::Application.routes.draw do

  # redirects
  match '/form' => redirect('/flower/new')

  get '/instagram' => 'home#instagram'

  get '/flower/new' => 'flowers#new'
  post '/flower/new' => 'flowers#create'
  match '/flower/:id' => 'flowers#show'

  get "/about" => 'home#about'
  get "/contact" => 'home#contact'
  root :to => 'home#index'
end
