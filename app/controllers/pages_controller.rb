class PagesController < ApplicationController
  def game
    render :layout => 'game_layout'
  end

  def home
  end
end
