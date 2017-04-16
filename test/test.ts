import * as ETBot from ".."

var bot = new ETBot.Bot(new ETBot.etbot_config("http://127.0.0.1:5000",3000))

bot.send_friend_message("你好",new ETBot.etbot_friend(2000330))