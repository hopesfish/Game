define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "delve/base",
         "delve/event/EventMixin"], function(dojo, declare, base, eventMixin){
    // declare our custom class
    return dojo.declare([eventMixin], {
        widget: null, // selected widget
        history: [], // history of selected widget
        onSubscribe: function(event, opts) {
            var that = this, EVENTS = base.EVENTS, widgetPath = opts[0], widgetParams = {};
            if (opts[1]) { widgetParams = opts[1]; }
            widgetParams.goback = false;

            if (event === EVENTS.WIDGETSELECT) {
                require([widgetPath], function(Widget) {
                    that.select(Widget, widgetParams);
                });
            }
        },
        onBackspace: function() {
            if (this.history.length === 0) { return; }
            var Widget = this.history.pop();
            this.select(Widget, {goback: true});
        },
        select: function(Widget, widgetParams) {
            var widget, goback = widgetParams ? widgetParams.goback : false;
            if (this.widget) {
                goback === true ? null : this.history.push(this.widget.constructor);
                this.widget.unwatch();
                this.widget.destroy();
            }
            widget = this.widget = new Widget(widgetParams);
            widget.placeAt(document.body);
        }
    });
});