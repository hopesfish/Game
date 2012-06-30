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
        maxPerCol: 5,
        maxRow: 0,
        rowIndex: 0,
        colIndex: 0,
        selected: 0,
        count: 0,

        postCreate: function() {
            this.inherited(arguments);
            this.count = query("div", this.stageContainer).length;
            this.maxRow = Math.round(this.count / this.maxPerCol);
        },

        select: function() {
            var selected = this.selected = this.rowIndex * this.maxPerCol + this.colIndex;
            query('div.selected', this.stageContainer).removeClass("selected");
            query('div:nth-child(' + (selected + 1) +')', this.stageContainer).addClass("selected");
        },

        onLeft: function() {
            this.colIndex -= 1;
            if (this._isLastRow()) {
                if (this.colIndex < 0) { this.colIndex = this.maxPerCol - 1; }
            } else if (this.colIndex < 0) {
                if (this.count % this.maxPerCol == 0) {
                    this.colIndex = this.maxPerCol - 1;
                } else {
                    this.colIndex = this.count % this.maxPerCol - 1;
                }
            }
            this.select();
        },

        onRight: function() {
            this.colIndex += 1;
            if (this._isLastRow()) {
                if (this.colIndex == this.maxPerCol) { this.colIndex = 0; }
            } else if (this._isLastItem()) {
                this.colIndex = 0;
            }
            this.select();
        },

        onUp: function() {
            if (this._isExceed() && this.rowIndex == 0) { return; }
            this.rowIndex -= 1;
            if (this.rowIndex < 0) { this.rowIndex = this.maxRow - 1; }
            this.select();
        },

        onDown: function() {
            if (this._isExceed() && this._isLastRow()) { return; }
            this.rowIndex += 1;
            if (this.rowIndex == this.maxRow) { this.rowIndex = 0; }
            this.select();
        },

        onEnter: function() {
        },

        _isExceed: function() {
            if (((this.rowIndex + 1) * this.maxPerCol + this.colIndex + 1) > this.count) { return true; }
            return false;
        },

        _isLastItem: function() {
            if ((this.rowIndex * this.maxPerCol + this.colIndex) == this.count) { return true; }
            return false;
        },

        _isLastRow: function() {
            return this.rowIndex != this.maxRow - 1;
        }
    });
});