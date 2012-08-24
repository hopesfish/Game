define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/DicePicker.html",
         "delve/base",
         "delve/event/EventMixin"],
    function(dojo, declare, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        result: '',
        postCreate: function() {
            this.inherited(arguments);
        },
        random: function() {
            var str = '';
            for(var i=0; i<6; i++) {
                var r = Math.floor(Math.random() * 7);
                if (r == 0) { r = 1; }
                if (r == 7) { r = 6; }
                str += r;
            }
            this.result = str;
        },
        onSubscribe: function(event, data) {
            var EVENTS = base.EVENTS;
            if (base.autoplay && event === EVENTS.DICE_REQUEST) {
                this.random();
                this.publish(EVENTS.DICE_RESPONSE, this.result);
            }
        }
    });
});