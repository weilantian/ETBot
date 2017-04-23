import express = require("express")
import bodyParser = require("body-parser")
import request = require("request")
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var url: String


enum Event {
    receive_message, login, stop, sate_change, input_qrcode, new_group, new_discuss, new_friend, new_group_member, new_discuss_member, group_property_change, group_member_property_change, friend_property_change, user_property_change
}

class etbot_config {
    send_uri: String
    post_api_port: Number

    constructor(send_uri: String, post_api_port: Number) {
        this.send_uri = send_uri
        this.post_api_port = post_api_port
    }
}



class etbot_friend {
    uid: Number



    constructor(uid: Number) {
        this.uid = uid

    }
}

class etbot_group {
    uid: Number
    groupMember: Array<Object>

    constructor(uid: Number, groupMember?: Array<Object>) {
        this.uid = uid
        this.groupMember = groupMember
    }


}

class etbot_discuss {
    id: Number
    groupMember: Array<Object>

    constructor(id: Number, groupMember: Array<Object>) {
        this.id = id
        this.groupMember = groupMember
    }


}



class etbot_message {
    info: Object

    reply(content, callback?) {
        if (this.info.type == "friend_message") {
            request(encodeURI(url + "/openqq/send_friend_message?uid=" + this.info.sender_uid + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    if (callback) {
                        callback(JSON.parse(body))
                    }
                } else {
                    console.log("[BOT]与服务器通讯失败")
                }
            })
        } else if (this.info.type == "group_message") {
            request(encodeURI(url + "/openqq/send_group_message?uid=" + this.info.group_uid + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    if (callback) {
                        callback(JSON.parse(body))
                    }

                } else {
                    console.log("[BOT]与服务器通讯失败")
                }
            })
        } else if (this.info.type == "discuss_message") {
            request(encodeURI(url + "/openqq/send_discuss_message?id=" + this.info.group_id + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    callback(JSON.parse(body))
                } else {
                    console.log("[BOT]与服务器通讯失败")
                }
            })
        } else if (this.info.type == "sess_message") {
            console.log(new Error("[BOT]暂时不支持回复临时聊天消息"))
        }
    }

    constructor(info: Object) {
        this.info = info
    }
}




class Bot {
    send_url: String
    post_port: Number


    receive_message: Function
    login: Function
    stop: Function
    sate_change: Function
    input_qrcode: Function
    new_group: Function
    new_discuss: Function
    new_friend: Function
    new_group_member: Function
    new_discuss_member: Function
    lose_group: Function
    lose_disuss: Function
    lose_firend: Function
    group_property_change: Function
    group_member_property_change: Function
    friend_property_change: Function
    user_property_change: Function



    get_user_info(callback) {
        request(this.send_url + "/openqq/get_user_info", function (err, satusCode, body) {
            if (!err) {
                console.log(body)
                callback(JSON.parse(body))
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    get_friend_info(callback) {
        request(this.send_url + "/openqq/get_friend_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body))
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    get_group_info(callback) {
        request(this.send_url + "/openqq/get_group_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body))
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    get_group_basic_info(callback) {
        request(this.send_url + "/openqq/get_group_basic_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body))
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    get_discuss_info(callback) {
        request(this.send_url + "/openqq/get_discuss_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body))
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    send_friend_message(content: String, to: etbot_friend, callback) {
        request(this.send_url + "/openqq/send_friend_message?uid=" + to.uid.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body))
                }
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    send_group_message(content: String, to: etbot_group, callback) {
        request(this.send_url + "/openqq/send_group_message?uid=" + to.uid.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body))
                }
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    send_discuss_message(content: String, to: etbot_discuss, callback) {
        request(this.send_url + "/openqq/send_discuss_message?id=" + to.id.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body))
                }
            } else {
                console.log("[BOT]与服务器通讯失败")
            }
        })
    }

    on(event: Event, callback: Function) {
        if (event == Event.receive_message) {
            this.receive_message = callback
        } else if (event == Event.login) {
            this.login = callback
        } else if (event == Event.stop) {
            this.stop = callback
        } else if (event == Event.sate_change) {
            this.sate_change = callback
        } else if (event == Event.input_qrcode) {
            this.input_qrcode = callback
        } else if (event == Event.new_group) {
            this.new_group = callback
        } else if (event == Event.new_discuss) {
            this.new_discuss = callback
        } else if (event == Event.new_friend) {
            this.new_friend = callback
        } else if (event == Event.new_group_member) {
            this.new_group_member = callback
        } else if (event == Event.new_discuss_member) {
            this.new_discuss_member = callback
        } else if (event == Event.group_property_change) {
            this.group_property_change = callback
        } else if (event == Event.group_member_property_change) {
            this.group_member_property_change = callback
        } else if (event == Event.friend_property_change) {
            this.friend_property_change = callback
        } else if (event == Event.user_property_change) {
            this.user_property_change = callback
        }
    }







    constructor(config?: etbot_config) {
        if (config) {
            this.send_url = config.send_uri
            this.post_port = config.post_api_port
            url = this.send_url
        } else {
            this.send_url = "http://127.0.0.1:5000"
            this.post_port = 3000
            url = this.send_url
        }

        try {
            app.listen(this.post_port, function () {
                console.log("[BOT]BOT Started.")
            })
            app.post('/', (req, res) => {
                console.log(req.body)
                if (req.body.post_type == "receive_message" && this.receive_message != undefined) {
                    this.receive_message(new etbot_message(req.body))
                } else if (req.body.post_type == "login" && this.login != undefined) {
                    this.login(req.body)
                } else if (req.body.post_type == "stop" && this.stop != undefined) {
                    this.stop(req.body)
                } else if (req.body.post_type == "sate_change" && this.sate_change != undefined) {
                    this.sate_change(req.body)
                } else if (req.body.post_type == "input_qrcode" && this.input_qrcode != undefined) {
                    this.input_qrcode(req.body)
                } else if (req.body.post_type == "new_group" && this.new_group != undefined) {
                    this.new_group(new etbot_group(req.body.params.group_uid, res.body.params.member))
                } else if (req.body.post_type == "new_discuss" && this.new_discuss != undefined) {
                    this.new_discuss(new etbot_discuss(req.body.params.id, res.body.params.member))
                } else if (req.body.post_type == "new_friend" && this.new_friend != undefined) {
                    this.new_friend(new etbot_friend(req.body.params.sender_uid))
                } else if (req.body.post_type == "new_group_member" && this.new_group_member != undefined) {
                    this.new_group_member(req.body)
                } else if (req.body.post_type == "new_discuss_member" && this.new_discuss_member != undefined) {
                    this.new_discuss_member(req.body)
                } else if (req.body.post_type == "group_property_change" && this.group_property_change != undefined) {
                    this.group_property_change(req.body)
                } else if (req.body.post_type == "group_member_property_change" && this.group_member_property_change != undefined) {
                    this.group_member_property_change(req.body)
                } else if (req.body.post_type == "friend_property_change" && this.friend_property_change != undefined) {
                    this.friend_property_change(req.body)
                } else if (req.body.post_type == "user_property_change" && this.user_property_change != undefined) {
                    this.user_property_change(req.body)
                }
            })
        } catch (err) {
            throw new Error(err)
        }

    }
}

export { Bot, Event, etbot_config, etbot_discuss, etbot_friend, etbot_group, etbot_message }