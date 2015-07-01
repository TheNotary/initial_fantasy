InitialFantasy::Application.routes.draw do
  get "pages/game"

  match "game" => "pages#game"

  root :to => "pages#home"
end
