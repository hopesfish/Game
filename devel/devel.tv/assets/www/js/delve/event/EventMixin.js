define([ "dojo/_base/lang", "dojo/_base/connect", "delve/base" ], function(lang, connect, base){
    return dojo.declare([], {
        postCreate: function() {
            this.inherited(arguments);
            this.watch();
        },
        watch: function() {
            var that = this, EVENTS = base.EVENTS;
            for (var event in EVENTS) {
                connect.subscribe(EVENTS[event], lang.hitch(that, lang.partial(that._onSubscribe, EVENTS[event])));
            }
        },
        _onSubscribe: function(event, data) {
            var EVENTS = base.EVENTS;
            switch (event) {
            case EVENTS.KEYUP:
                this.onUp(data);
                break;
            case EVENTS.KEYDOWN:
                this.onDown(data);
                break;
            case EVENTS.KEYLEFT:
                this.onLeft(data);
                break;
            case EVENTS.KEYRIGHT:
                this.onRight(data);
                break;
            case EVENTS.KEYENTER:
                this.onEnter(data);
                break;
            case EVENTS.KEYESC:
                this.onEsc(data);
                break;
            default:
                this.onSubscribe(event, data);
                break;
            }
        },
        onUp: function() {},
        onDown: function() {},
        onLeft: function() {},
        onRight: function() {},
        onEnter: function() {},
        onEsc: function() {},
        onSubscribe: function() {}
    });
});