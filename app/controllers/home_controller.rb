class HomeController < ApplicationController
  layout 'application'
  def index
    @router_app_props = { name: "Router User" }
  end
end
