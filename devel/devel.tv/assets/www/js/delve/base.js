define([], function(){
    var module = dojo.declare([], {});
    module.EVENTS = {};
    module.EVENTS.KEYUP = "/delve/event/keyup";
    module.EVENTS.KEYDOWN = "/delve/event/down";
    module.EVENTS.KEYLEFT = "/delve/event/keyleft";
    module.EVENTS.KEYRIGHT = "/delve/event/keyright";
    module.EVENTS.KEYENTER = "/delve/event/keyenter";
    module.EVENTS.KEYSPACE = "/delve/event/keyspace";
    module.EVENTS.KEYBACKSPACE = "/delve/event/keybackspace";
    module.EVENTS.KEYESC = "/delve/event/keyesc";

    module.EVENTS.WIDGETSELECT = "/delve/widget/select";

    module.EVENTS.MESSAGE = "/delve/message";

    module.EVENTS.BATTLE_REFRESH = "/delve/battle/refresh";
    module.EVENTS.CHARACTER_LIST_REFRESH = "/delve/character/list/refresh";
    module.EVENTS.CHARACTER_LIST_REVERSE = "/delve/character/list/reverse";
    module.EVENTS.CHARACTER_SOURCE_REQUEST = "/delve/character/source/request";
    module.EVENTS.CHARACTER_SOURCE_RESPONSE = "/delve/character/source/response";
    module.EVENTS.CHARACTER_TARGET_REQUEST = "/delve/character/target/request";
    module.EVENTS.CHARACTER_TARGET_RESPONSE = "/delve/character/target/response";
    module.EVENTS.CHARACTER_INSTANCE_SELECT = "/delve/character/instance/select";

    module.EVENTS.DICE_REQUEST = "/delve/dice/request";
    module.EVENTS.DICE_RESPONSE = "/delve/dice/response";

    module.SETTING = {
        bgVolume: 60
    };

    module.autoplay = true;
    return module;
});