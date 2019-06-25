$(document).on ('turbolinks:load',function(){
  function buildHTML(comment){
    var text = comment.text ? `<p class="message__text">${comment.text}</p> ` : "" ;
    var image = comment.image ? `<img class="lower-message__image"src="${comment.image}" >` : "" ;
    var html = `<div class="message">
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
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    console.log('非同期');
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
      console.log(data)
      var html = buildHTML(data);
      // htmlの箱にbuildHTML(data)を入れる
      $('.messages').append(html)
      // appendはhtmlをmessage()に追加
      $('#message_content').val('')
      // valに入れたコメントを#message_content
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});

      console.log($('.message')[0])
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      // alert('always');
      // delete button.disabled;
      $(".submit-btn").prop('disabled', false);
    })
  })
})