define([ "dojo/_base/kernel", "dojo/_base/connect", "delve/base", 'dojo/_base/event'], function(dojo, connect, base){
    return dojo.declare([], {
        watch: function() {
            var EVENTS = base.EVENTS;
            connect.connect(document, 'onkeypress', function(e) {
                switch(e.charOrCode) {
                    case dojo.keys.LEFT_ARROW:
                        connect.publish(EVENTS.KEYLEFT);
                        break;
                    case dojo.keys.RIGHT_ARROW:
                        connect.publish(EVENTS.KEYRIGHT);
                        break;
                    case dojo.keys.UP_ARROW:
                        connect.publish(EVENTS.KEYUP);
                        break;
                    case dojo.keys.DOWN_ARROW:
                        connect.publish(EVENTS.KEYDOWN);
                        break;
                    case dojo.keys.ENTER:
                        connect.publish(EVENTS.KEYENTER);
                        break;
                    case dojo.keys.BACKSPACE:
                        connect.publish(EVENTS.KEYBACKSPACE);
                        break;
                    case dojo.keys.ESC:
                        connect.publish(EVENTS.KEYESC);
                        break;
                    default:
                        break;
                }
                if (e.charOrCode !== dojo.keys.F12 && e.charOrCode !== dojo.keys.F5) {
                    dojo.stopEvent(e);
                }
            });
        }
    });
});