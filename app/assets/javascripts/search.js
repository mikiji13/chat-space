$(function() {

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix chat-group-form__field">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>
    `
    return html
   }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'

    })

    .done(function(users) {
      $("#user-search-result").empty();
      // console.log(users)
      if (users.length !== 0) {

        users.forEach(function(user){
          // console.log(users.length)
          var html = appendUser(user);
          $("#user-search-result").append(html)
        });
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
});