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

    module.EVENTS.CHARACTER_INSTANCE_SELECT = "/delve/character/instance/select";
    
    return module;
});