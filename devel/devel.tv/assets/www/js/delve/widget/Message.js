define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/dom-construct",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Message.html",
         "delve/base",
         "delve/event/EventMixin"], function(dojo, declare, domConstruct, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        message: '战斗开始!',
        postCreate: function() {
            this.inherited(arguments);
            this.print();
        },
        onSubscribe: function(event, data) {
            var EVENTS = base.EVENTS;
            if (event === EVENTS.MESSAGE) {
                this.message = data[0];
                this.print();
            }
        },
        print: function() {
            domConstruct.place(
                    '<span>' +  this.message + '</span>',
                    this.messageContainer, 'last');
        }
    });
});