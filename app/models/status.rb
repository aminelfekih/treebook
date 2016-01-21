class Status < ActiveRecord::Base
	def Status_params
    params.require(:Status).permit(:content , :user_id)
  	end
  belongs_to :user
end
