define([], function(){
    var module = dojo.declare([], {});
    module.EVENTS = {};
    module.EVENTS.KEYUP = "/delve/event/keyup";
    module.EVENTS.KEYDOWN = "/delve/event/down";
    module.EVENTS.KEYLEFT = "/delve/event/keyleft";
    module.EVENTS.KEYRIGHT = "/delve/event/keyright";
    module.EVENTS.KEYENTER = "/delve/event/keyenter";
    module.EVENTS.BACKSPACE = "/delve/event/backspace";
    module.EVENTS.KEYESC = "/delve/event/keyesc";
    return module;
});