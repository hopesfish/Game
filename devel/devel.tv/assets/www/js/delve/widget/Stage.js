define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/dom-attr",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Stage.html",
         "delve/base",
         "delve/event/EventMixin",
         "dojo/NodeList-dom" ], function(dojo, declare, domAttr, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        selected: 0,
        count: 0,

        postCreate: function() {
            this.inherited(arguments);
            this.count = query("div", this.stageContainer).length;
        },

        select: function() {
            query('div.selected', this.stageContainer).removeClass("selected");
            query('div:nth-child(' + (this.selected + 1) +')', this.stageContainer).addClass("selected");
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
        },

        onEnter: function() {
        }
    });
});