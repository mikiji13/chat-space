class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
    # カレントユーザーに紐づいているグ    ループ
    @group = Group.find(params[:group_id])
  end
end
