require 'test_helper'

class HtmlTestsControllerTest < ActionController::TestCase
  test "should get enemies_list" do
    get :enemies_list
    assert_response :success
  end

end
