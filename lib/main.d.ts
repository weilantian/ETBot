export enum Event {
    receive_message, login, stop, sate_change, input_qrcode, new_group, new_discuss, new_friend, new_group_member, new_discuss_member, group_property_change, group_member_property_change, friend_property_change, user_property_change
}

export class etbot_config {
    constructor(send_uri: String, post_api_port: Number)
}

export class etbot_friend {
    constructor(uid: Number)
}

export class etbot_group {
    constructor(uid: Number, groupMember: Array<Object>)
}

export class etbot_discuss {
    constructor(id: Number, groupMember: Array<Object>)
}

export class etbot_message {
    constructor(info: Object)
    reply(): void
}

export class Bot {
    constructor(config?: etbot_config)
    get_user_info(callback: Function): void
    get_friend_info(callback: Function): void
    get_group_info(callback: Function): void
    get_group_basic_info(callback: Function): void
    get_discuss_info(callback: Function): void
    send_friend_message(content: String,to: etbot_friend,callback?:Function)
    send_group_message(content: String,to: etbot_group,callback?:Function)
    send_discuss_message(content: String,to: etbot_discuss,callback?:Function)
    on(event: Event,callback: Function)
}