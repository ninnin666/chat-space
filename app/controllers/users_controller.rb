class UsersController < ApplicationController

  def edit
  end

  def login_form
  end

  def update
    if current_user.update(user_paramus)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_paramus
    params.require(:user).permit(:name, :email)
  end
end
