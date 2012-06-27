// dojo/_base/declare and dijit/Dialog are loaded from CDN
define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Menu.html" ], function(dojo, declare, widget, templatedMixin, widgetsInTemplateMixin, template){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin], {
        templateString: template,
        postCreate: function() {
        }
    });
});