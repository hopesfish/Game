define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/cookie",
         "delve/base",
         "delve/event/EventMixin"], function(dojo, declare, cookie, base, eventMixin){
    // declare our custom class
    return dojo.declare([eventMixin], {
        widget: null, // selected widget
        history: [], // history of selected widget
        debug: false,
        cookieName: "/delve/widget/current",
        initWidget: function(Widget, widgetParams) {
            var widget, goback = widgetParams ? widgetParams.goback : false;
            
            if (this.widget) {
                goback === true ? null : this.history.push(this.widget.constructor);
                this.widget.destroy();
            }
            widget = this.widget = new Widget(widgetParams);
            widget.placeAt(document.body);
            if (window.location.href.indexOf('clearcookie=true') >= 0) {
                cookie(this.cookieName, null);
            }
        },
        lazyLoad: function(path, params) {
            var that = this;
            this.debug ? cookie(this.cookieName, path, {expires: 5}) : null;
            if (path === 'undefined') { return; }
            require([path], function(Widget) {
                that.initWidget(Widget, params);
            });
        },
        onSubscribe: function(event, opts) {
            var that = this, EVENTS = base.EVENTS, widgetPath = opts[0], widgetParams = {};
            if (opts[1]) { widgetParams = opts[1]; }
            widgetParams.goback = false;

            if (event === EVENTS.WIDGETSELECT) {
                this.lazyLoad(widgetPath, widgetParams);
            }
        },
        select: function(Widget, widgetParams) {
            var cookieWidgetPath = cookie(this.cookieName);
            if (this.debug && cookieWidgetPath != 'null') {
                this.lazyLoad(cookieWidgetPath, widgetParams || {});
            } else {
                this.initWidget(Widget, widgetParams);
            }
        },
        onBackspace: function() {
            if (this.history.length === 0) { return; }
            var Widget = this.history.pop();
            this.initWidget(Widget, {goback: true});
        },
    });
});