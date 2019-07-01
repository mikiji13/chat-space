$(function(){
  function buildHTML(comment){
    var text = comment.text ? `<p class="message__text">${comment.text}</p> ` : "" ;
    var image = comment.image ? `<img class="lower-message__image"src="${comment.image}" >` : "" ;
    var html = `<div class="message" data-id="${comment.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${comment.user_name}</p>
                    <p class="message__upper-info__date">${comment.created_at}</p>
                  </div>
                  ${text}
                  ${image}
                  </div>
                <div>`
    return html;
  }

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id');
    $.ajax({
      url: location.href.json, //ルーティングで設定した通りのURLを指定
      type: 'get', //ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json', //jsonを指定
      data: {last_message_id: last_message_id} //dataオプションでリクエストに値を含める
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      messages.forEach(function(message){ //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $(".messages").append(insertHTML) //メッセージを追加
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      });
    })
    .fail(function() {
      console.log('error');
    });
  };

  var page_url = window.location.pathname;
  var groupId = $('.main-header__left-box__current-group').data('group_id');
  if(page_url == `/groups/${groupId}/messages`){
    setInterval(reloadMessages, 5000);
  }


  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var button = e.target;
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",// HTTPメソッド
      data: formData,// リクエストと一緒に送るdata
      dataType: 'json',//JSON形式でリクエスト送る
      processData: false,// リクエストに含まれているdataの実際の型を変更しないための記述出そうだ
      contentType: false,// リクエストに含まれているdataの型はこれですよ〜の記述（リクエストヘッダにあるらしい）を変更しない
    })
    .done(function(data){
      var html = buildHTML(data);
      // htmlの箱にbuildHTML(data)を入れる
      $('.messages').append(html)
      // appendはhtmlをmessage()に追加
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      // .messagesをanimateを使って、scrollTopでスクロール、scrollHeightで.messages高さを取得、[0]jsをjqにする
      $('#new_comment')[0].reset();
      // #new_comment全体をリセットする
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".submit-btn").prop('disabled', false);
    })
  })
})