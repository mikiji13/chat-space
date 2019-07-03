$(function() {

  function appendUser(user) {
    var html = `
    <div class="user-search-result">
    <div class="chat-group-user clearfix chat-group-form__field">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>
    </div>
    `
    return html
   }

   function appendMember(id,name) {
    var html = `
    <div class="user-search-result">
    <div class="chat-group-user clearfix chat-group-form__field">
      <input name='group[user_ids][]' type="hidden" value="${id}" >
      <p class="chat-group-user__name">${name}</p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name="${name}">削除</a>
    </div>
    </div>
    `
    return html
   }

  $("#user-search-result").on("click",".user-search-add",function(){ //chat-group-user__btn--addをonした時、
    var id = $(this).attr("data-user-id"); //data-user-idをvar idに入れる
    var name = $(this).attr("data-user-name"); //data-user-nameをvar nameに入れる
    var user = appendMember(id,name) //var userにidとnameが設定されたappendMemberを入れる
    $("#chat-group-users").append(user) //htmlを介す
    $(this).parent().remove();
    // $(".chat-group-user__btn").empty();
    // チャットメンバーのスペースに.clickのidを取得してappendメソッドを使う
    // idを取得した行を消す
    // 新しい行を指定して、データを挿入する
  })

  $("#chat-group-users").on("click",".user-search-remove", function(){
    $(this).parent().remove()
    console.log($(this).parent(".chat-group-user").remove())
    // 削除ボタンをクリックした時にremoveさせる
  })

  $("#user-search-field").on("input", function() {
    var input = $("#user-search-field").val();
    console.log(input.length);
    if (input.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = appendUser(user);
            $("#user-search-result").append(html)
          });
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    }
    else {
      $(".user-search-result").remove()
    }
  });
});