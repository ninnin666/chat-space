$(function(){

  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="message">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.nickname}
            </div>
              <div class="upper-message__date">
                ${message.data}
              </div>
            </div>
          </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${message.text}
                </p>
                  <img class="lower-message__image" src=${message.image}>
                </div>`
  } else {
    var html =
      `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.nickname}
          </div>
        </div>
      </div>
        <div class="upper-message__date">
          ${message.data}
        </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.text}
            </p>
          </div>`
    }
    return html
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled',false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})

