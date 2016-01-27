class DataVisController < ApplicationController

  def data
    respond_to do |format|
    format.json { render json: User.all.to_json }
    format.html { render template:  "data_vis/show"}
    end
  end
end
