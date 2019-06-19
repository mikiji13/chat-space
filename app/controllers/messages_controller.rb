class MessagesController < ApplicationController
  def index
    @groups = current_user.group
    # カレントユーザーに紐づいているグループ
  end
end
