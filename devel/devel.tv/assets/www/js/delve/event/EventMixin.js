define([ "dojo/_base/lang", "dojo/_base/connect", "delve/base"], function(lang, connect, base){
    return dojo.declare([], {
        postCreate: function() {
            this.inherited(arguments);
            this.watch();
        },
        publish: function(event, data) {
            connect.publish(event, data);
        },
        watch: function() {
            var that = this, EVENTS = base.EVENTS;
            // 为每个子类创建自己的handlers
            if (typeof this.handlers === 'undefined') {
                this.handlers = [];
            }
            for (var event in EVENTS) {
                this.handlers.push(connect.subscribe(EVENTS[event], lang.hitch(that, lang.partial(that._onSubscribe, EVENTS[event]))));
            }
        },
        unwatch: function() {
            var that = this, handlers = this.handlers;
            while(handlers.length > 0) {
                connect.unsubscribe(handlers.pop());
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
            case EVENTS.KEYBACKSPACE:
                this.onBackspace(data);
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