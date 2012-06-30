define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/dom-attr",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Battle.html",
         "delve/base",
         "delve/event/EventMixin",
         "dojo/NodeList-dom" ], function(dojo, declare, domAttr, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        postMixInProperties: function() {
            //console.info(this.stageId);
        },
        postCreate: function() {
            this.inherited(arguments);
        }
    });
});