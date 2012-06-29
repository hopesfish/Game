// dojo/_base/declare and dijit/Dialog are loaded from CDN
define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "delve/base",
         "delve/event/EventMixin"], function(dojo, declare, base, eventMixin){
    // declare our custom class
    return dojo.declare([eventMixin], {
        widget: null, // selected widget
        history: [], // history of selected widget
        onSubscribe: function(event, data) {
            var that = this, EVENTS = base.EVENTS;
            if (event === EVENTS.WIDGETSELECT) {
                require([data], function(Widget) {
                    that.select(Widget);
                });
            }
        },
        onBackspace: function() {
            if (this.history.length === 0) { return; }
            var Widget = this.history.pop();
            this.select(Widget, true);
        },
        select: function(Widget, goback) {
            var widget;
            if (this.widget) {
                goback === true ? null : this.history.push(this.widget.constructor);
                this.widget.unwatch();
                this.widget.destroy();
            }
            widget = this.widget = new Widget();
            widget.placeAt(document.body);
        }
    });
});