json.id @message.id
json.text @message.content
json.image @message.image.url
json.nickname @message.user.name
json.date @message.created_at