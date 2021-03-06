class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    # @groups = current_user.groups
    # カレントユーザーに紐づいているグループ
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json do
        @mikiji_messages = @group.messages.where('id > ?', params[:last_message_id])
      end
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'  }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
