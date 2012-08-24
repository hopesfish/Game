define([ "dojo/_base/lang", "dojo/_base/connect", "delve/base"], function(lang, connect, base){
    return dojo.declare([], {
        _watch : true,
        postCreate: function() {
            this.inherited(arguments);
            this.watch();
        },
        destroy: function() {
            this.unwatch();
            this.inherited(arguments);
        },
        publish: function(event, data) {
            data ? connect.publish(event, data) : connect.publish(event);
        },
        enable: function() {
            this._watch = true;
            this.unwatch();
            this.watch();
        },
        disable: function() {
            this._watch = false;
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
            if (handlers) {
                while(handlers.length > 0) {
                    connect.unsubscribe(handlers.pop());
                }
            }
        },
        _onSubscribe: function(event) {
            if (!this._watch) { return; }
            var opts = {};
            if (arguments.length > 1 && arguments[1] !== undefined) {
                opts = Array.prototype.slice.call(arguments, 1);
            }

            var EVENTS = base.EVENTS;
            switch (event) {
            case EVENTS.KEYUP:
                this.onUp(opts);
                break;
            case EVENTS.KEYDOWN:
                this.onDown(opts);
                break;
            case EVENTS.KEYLEFT:
                this.onLeft(opts);
                break;
            case EVENTS.KEYRIGHT:
                this.onRight(opts);
                break;
            case EVENTS.KEYENTER:
                this.onEnter(opts);
                break;
            case EVENTS.KEYSPACE:
                this.onSpace(opts);
                break;
            case EVENTS.KEYESC:
                this.onEsc(opts);
                break;
            case EVENTS.KEYBACKSPACE:
                this.onBackspace(opts);
                break;
            default:
                this.onSubscribe(event, opts);
                break;
            }
        },
        onUp: function() {},
        onDown: function() {},
        onLeft: function() {},
        onRight: function() {},
        onEnter: function() {},
        onSpace: function() {},
        onEsc: function() {},
        onBackspace: function() {},
        onSubscribe: function() {}
    });
});