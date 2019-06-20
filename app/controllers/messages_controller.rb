class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    # カレントユーザーに紐づいているグループ
  end
end
