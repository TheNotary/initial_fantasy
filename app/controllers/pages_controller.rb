class PagesController < ApplicationController
  def game
    # we simulate that the user has just logged into their account here...
    # hmmm... maybe it's time to setup web sockets????

    render :layout => 'game_layout'
  end

  def home
  end
end
