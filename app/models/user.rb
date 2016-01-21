class User < ActiveRecord::Base
  
# Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

	devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  	validates :first_name, presence: true
  	validates :last_name, presence: true
	validates :profile_name, presence: true, uniqueness: true, 
    format: {
      with: /^[a-zA-Z0-9]+$/,
      message: 'must be formatted correctly.'
      # message must correspond to the one in user_test.rb
    }


	has_many :statuses

end
