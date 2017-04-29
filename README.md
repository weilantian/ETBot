# ETBot

一个明确，简洁，实用的QQ机器人框架。

使用「ETBot」非常简单，不到30行代码就可以构建一个酷炫的QQ机器人。

```typescript
import * as ETBot from "etbot"

var config = new ETBot.etbot_config("http://127.0.0.1:2333",3000)

var bot = new ETBot.Bot(config)

bot.get_user_info(function(result) {
    console.log(result)
})

bot.on(ETBot.Event.receive_message,function(message) {
    console.log(message.info)
    message.reply("你好")
})
```

是不是非常酷炫？？

## Api文档
[单击进入](https://weilantian.gitbooks.io/etbot/content/)



## 快速开始

使用这个框架需要具备的知识

- Node.js相关
- TypeScript



这里使用一个回复好友说的话的小事例来大概介绍一下ETBot的工作原理。



ETBot配合使用Perl语言编写的项目[sjdy521/Mojo-Webqq](https://github.com/sjdy521/Mojo-Webqq)使用，通过请求该项目的Api与收取该项目的上报信息工作。

首先，先确认您的电脑安装了Perl，并安装Perl模块*Mojo::Webqq*，[sjdy521/Mojo-Webqq](https://github.com/sjdy521/Mojo-Webqq)中配置运行环境的详细说明

接着，编写一个main.pl脚本

```perl
#!/usr/bin/env perl
 use Mojo::Webqq;
 my ($host,$port,$post_api);
 
 $host = "0.0.0.0"; #发送消息接口监听地址，没有特殊需要请不要修改
 $port = 5000;      #发送消息接口监听端口，修改为自己希望监听的端口
 $post_api = 'http://127.0.0.1:3000';  #接收到的消息上报接口，如果不需要接收消息上报，可以删除或注释此行
 
 my $client = Mojo::Webqq->new();
 $client->load("ShowMsg");
 $client->load("Openqq",data=>{listen=>[{host=>$host,port=>$port}], post_api=>$post_api, post_event_list => ['login','stop','state_change','input_qrcode','new_group','new_friend','new_group_member','lose_group','lose_friend','lose_group_member']});
 $client->run();
```

接着，运行这个脚本

```shell
perl main.pl
```

并根据提示登录QQ。

接着，建立一个typescript项目并安装ETBot

```Shell
npm init
```

配置好tsconfig.json

```Json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true
    },
    "exclude": [
        "node_modules"
    ]
}
```

然后创建一个index.ts，并引入ETBot

```typescript
import * as ETBot from "etbot"
```

接着，构造出一个Bot类

```typescript
let config = new ETBot.config("http://127.0.0.1:5000",3000)

let bot = new ETBot.Bot(config)
```

很好，机器人已经创建完毕，接下来，我们需要写一个监听事件，用于监听QQ好友信息

```typescript
bot.on(ETBot.Event.receive_message, (message) => {
  message.reply("你说了"+message.info.content)
})
```

接着，使用tsc命令将文件编译为.js

```shell
tsc
```

最后，运行这个项目：

```shell
node index.js
```

是不是非常的酷？？



## 更多

作者是初中党。。时间不多，Api文档正在编写过程中，完成之后第一时间发布上来



### 还有...

某些命名规则可能没有遵循TypeScript。。。会在后期作出改进。
