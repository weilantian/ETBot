"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var url;
var Event;
(function (Event) {
    Event[Event["receive_message"] = 0] = "receive_message";
    Event[Event["login"] = 1] = "login";
    Event[Event["stop"] = 2] = "stop";
    Event[Event["sate_change"] = 3] = "sate_change";
    Event[Event["input_qrcode"] = 4] = "input_qrcode";
    Event[Event["new_group"] = 5] = "new_group";
    Event[Event["new_discuss"] = 6] = "new_discuss";
    Event[Event["new_friend"] = 7] = "new_friend";
    Event[Event["new_group_member"] = 8] = "new_group_member";
    Event[Event["new_discuss_member"] = 9] = "new_discuss_member";
    Event[Event["group_property_change"] = 10] = "group_property_change";
    Event[Event["group_member_property_change"] = 11] = "group_member_property_change";
    Event[Event["friend_property_change"] = 12] = "friend_property_change";
    Event[Event["user_property_change"] = 13] = "user_property_change";
})(Event || (Event = {}));
exports.Event = Event;
var etbot_config = (function () {
    function etbot_config(send_uri, post_api_port) {
        this.send_uri = send_uri;
        this.post_api_port = post_api_port;
    }
    return etbot_config;
}());
exports.etbot_config = etbot_config;
var etbot_friend = (function () {
    function etbot_friend(uid) {
        this.uid = uid;
    }
    return etbot_friend;
}());
exports.etbot_friend = etbot_friend;
var etbot_group = (function () {
    function etbot_group(uid, groupMember) {
        this.uid = uid;
        this.groupMember = groupMember;
    }
    return etbot_group;
}());
exports.etbot_group = etbot_group;
var etbot_discuss = (function () {
    function etbot_discuss(id, groupMember) {
        this.id = id;
        this.groupMember = groupMember;
    }
    return etbot_discuss;
}());
exports.etbot_discuss = etbot_discuss;
var etbot_message = (function () {
    function etbot_message(info) {
        this.info = info;
    }
    etbot_message.prototype.reply = function (content, callback) {
        if (this.info.type == "friend_message") {
            request(encodeURI(url + "/openqq/send_friend_message?uid=" + this.info.sender_uid + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    if (callback) {
                        callback(JSON.parse(body));
                    }
                }
                else {
                    console.log("[BOT]与服务器通讯失败");
                }
            });
        }
        else if (this.info.type == "group_message") {
            request(encodeURI(url + "/openqq/send_group_message?uid=" + this.info.group_uid + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    if (callback) {
                        callback(JSON.parse(body));
                    }
                }
                else {
                    console.log("[BOT]与服务器通讯失败");
                }
            });
        }
        else if (this.info.type == "discuss_message") {
            request(encodeURI(url + "/openqq/send_discuss_message?id=" + this.info.group_id + "&content=" + content), function (err, satusCode, body) {
                if (!err) {
                    callback(JSON.parse(body));
                }
                else {
                    console.log("[BOT]与服务器通讯失败");
                }
            });
        }
        else if (this.info.type == "sess_message") {
            console.log(new Error("[BOT]暂时不支持回复临时聊天消息"));
        }
    };
    return etbot_message;
}());
exports.etbot_message = etbot_message;
var Bot = (function () {
    function Bot(config) {
        var _this = this;
        this.send_url = config.send_uri;
        this.post_port = config.post_api_port;
        url = this.send_url;
        try {
            app.listen(this.post_port, function () {
                console.log("[BOT]BOT Started.");
            });
            app.post('/', function (req, res) {
                console.log(req.body);
                if (req.body.post_type == "receive_message" && _this.receive_message != undefined) {
                    _this.receive_message(new etbot_message(req.body));
                }
                else if (req.body.post_type == "login" && _this.login != undefined) {
                    _this.login(req.body);
                }
                else if (req.body.post_type == "stop" && _this.stop != undefined) {
                    _this.stop(req.body);
                }
                else if (req.body.post_type == "sate_change" && _this.sate_change != undefined) {
                    _this.sate_change(req.body);
                }
                else if (req.body.post_type == "input_qrcode" && _this.input_qrcode != undefined) {
                    _this.input_qrcode(req.body);
                }
                else if (req.body.post_type == "new_group" && _this.new_group != undefined) {
                    _this.new_group(new etbot_group(req.body.params.group_uid, res.body.params.member));
                }
                else if (req.body.post_type == "new_discuss" && _this.new_discuss != undefined) {
                    _this.new_discuss(new etbot_discuss(req.body.params.id, res.body.params.member));
                }
                else if (req.body.post_type == "new_friend" && _this.new_friend != undefined) {
                    _this.new_friend(new etbot_friend(req.body.params.sender_uid));
                }
                else if (req.body.post_type == "new_group_member" && _this.new_group_member != undefined) {
                    _this.new_group_member(req.body);
                }
                else if (req.body.post_type == "new_discuss_member" && _this.new_discuss_member != undefined) {
                    _this.new_discuss_member(req.body);
                }
                else if (req.body.post_type == "group_property_change" && _this.group_property_change != undefined) {
                    _this.group_property_change(req.body);
                }
                else if (req.body.post_type == "group_member_property_change" && _this.group_member_property_change != undefined) {
                    _this.group_member_property_change(req.body);
                }
                else if (req.body.post_type == "friend_property_change" && _this.friend_property_change != undefined) {
                    _this.friend_property_change(req.body);
                }
                else if (req.body.post_type == "user_property_change" && _this.user_property_change != undefined) {
                    _this.user_property_change(req.body);
                }
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }
    Bot.prototype.get_user_info = function (callback) {
        request(this.send_url + "/openqq/get_user_info", function (err, satusCode, body) {
            if (!err) {
                console.log(body);
                callback(JSON.parse(body));
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.get_friend_info = function (callback) {
        request(this.send_url + "/openqq/get_friend_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body));
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.get_group_info = function (callback) {
        request(this.send_url + "/openqq/get_group_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body));
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.get_group_basic_info = function (callback) {
        request(this.send_url + "/openqq/get_group_basic_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body));
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.get_discuss_info = function (callback) {
        request(this.send_url + "/openqq/get_discuss_info", function (err, satusCode, body) {
            if (!err) {
                callback(JSON.parse(body));
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.send_friend_message = function (content, to, callback) {
        request(this.send_url + "/openqq/send_friend_message?uid=" + to.uid.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body));
                }
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.send_group_message = function (content, to, callback) {
        request(this.send_url + "/openqq/send_group_message?uid=" + to.uid.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body));
                }
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.send_discuss_message = function (content, to, callback) {
        request(this.send_url + "/openqq/send_discuss_message?id=" + to.id.toString() + "&content=" + content, function (err, satusCode, body) {
            if (!err) {
                if (callback) {
                    callback(JSON.parse(body));
                }
            }
            else {
                console.log("[BOT]与服务器通讯失败");
            }
        });
    };
    Bot.prototype.on = function (event, callback) {
        if (event == Event.receive_message) {
            this.receive_message = callback;
        }
        else if (event == Event.login) {
            this.login = callback;
        }
        else if (event == Event.stop) {
            this.stop = callback;
        }
        else if (event == Event.sate_change) {
            this.sate_change = callback;
        }
        else if (event == Event.input_qrcode) {
            this.input_qrcode = callback;
        }
        else if (event == Event.new_group) {
            this.new_group = callback;
        }
        else if (event == Event.new_discuss) {
            this.new_discuss = callback;
        }
        else if (event == Event.new_friend) {
            this.new_friend = callback;
        }
        else if (event == Event.new_group_member) {
            this.new_group_member = callback;
        }
        else if (event == Event.new_discuss_member) {
            this.new_discuss_member = callback;
        }
        else if (event == Event.group_property_change) {
            this.group_property_change = callback;
        }
        else if (event == Event.group_member_property_change) {
            this.group_member_property_change = callback;
        }
        else if (event == Event.friend_property_change) {
            this.friend_property_change = callback;
        }
        else if (event == Event.user_property_change) {
            this.user_property_change = callback;
        }
    };
    return Bot;
}());
exports.Bot = Bot;
//# sourceMappingURL=etbot.js.map