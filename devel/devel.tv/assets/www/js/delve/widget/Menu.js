// dojo/_base/declare and dijit/Dialog are loaded from CDN
define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Menu.html",
         "delve/event/EventMixin",
         "dojo/NodeList-dom" ], function(dojo, declare, query, widget, templatedMixin, widgetsInTemplateMixin, template, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        selected: 0,
        count: 0,

        postCreate: function() {
        	this.inherited(arguments);
        	this.count = query("div", this.menuContainer).length;
        },

        select: function() {
            query('div.selected', this.menuContainer).removeClass("selected");
            query('div:nth-child(' + (this.selected + 1) +')', this.menuContainer).addClass("selected");
        },
        onUp: function() {
            this.selected -= 1;
            if (this.selected < 0) { this.selected = this.count - 1; }
            this.select();
        },

        onDown: function() {
            this.selected += 1;
            if (this.selected == this.count) { this.selected = 0; }
            this.select();
        }
    });
});