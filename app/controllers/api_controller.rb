class ApiController < ApplicationController

  
  def requesting_next_command

  end

  # when the client chooses to say, attack, it tells the server of the attack
  # and the server calculates the effect and tells the client so it can redner
  # that effect
  def battle_action
    game = current_user.game

    effect = game.apply_battle_action

    render json: effect
  end
end
