$(function(){

  function buildHTML(user){
        var html =
          `<div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
          </div>`
          $('#user-search-result').append(html)
  }

  function errbuildHTML(user){
        var html =`
          <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">ユーザーが見つかりません</p>
          </div>`
          $('#user-search-result').append(html)
  }

  function DeleteHTML(Deletename,Deleteid) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${Deleteid}'>
              <p class='chat-group-user__name'>${Deletename}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $("#chat-group-users").append(html)
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          buildHTML(user);
        });
        } else if (input.length == 0) {
          return false;
        } else {
          errbuildHTML();
        }
      })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });

  $("#user-search-result").on('click','.user-search-add',function(){
let name = $(this).data("user-name");
let id = $(this).data("user-id");
DeleteHTML(name,id);
$(this).parent().remove();
  });

$(".js-add-user").on('click','.schat-group-user__btn--remove',function(){
$(this).parent().remove();
  });
});
