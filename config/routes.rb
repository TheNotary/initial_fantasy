InitialFantasy::Application.routes.draw do
  get "html_tests/enemies_list"

  get "pages/game"

  match "game" => "pages#game"

  root :to => "pages#home"
end
