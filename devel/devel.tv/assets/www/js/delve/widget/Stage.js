define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/_base/array",
         "dojo/dom-attr",
         "dojo/dom-construct",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Stage.html",
         "delve/base",
         "delve/event/EventMixin",
         "delve/resource/Stage",
         "dojo/NodeList-dom" ],
    function(dojo, declare, array, domAttr, domConstruct, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin, Stage){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        stages: null,
        selected: 0,
        maxPerCol: 5,
        maxRow: 0,
        rowIndex: 0,
        colIndex: 0,
        selected: 0,
        unlockCount: 0,

        postCreate: function() {
            this.inherited(arguments);
            this.stages = delve.resource.Stage.all();
            this.unlockCount = array.filter(this.stages, function(stage){ return !stage.locked; }).length;
            this.maxRow = Math.ceil(this.unlockCount / this.maxPerCol);
            this.render();
            this.select();
        },

        render: function() {
            var that = this, stages = this.stages;
            array.forEach(stages, function(stage) {
                var locked = stage.locked ? 'lock' : '';
                domConstruct.place(
                        '<div class="stage ' + locked + '">' +  stage.id + '</div>',
                        that.stageContainer, 'last');
            });
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
                if (this.unlockCount % this.maxPerCol == 0) {
                    this.colIndex = this.maxPerCol - 1;
                } else {
                    this.colIndex = this.unlockCount % this.maxPerCol - 1;
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
            var EVENTS = base.EVENTS, params = {stageId: this.stages[this.selected].id};
            this.publish(EVENTS.WIDGETSELECT, ['delve/widget/battle', params]);
        },

        _isExceed: function() {
            if (((this.rowIndex + 1) * this.maxPerCol + this.colIndex + 1) > this.unlockCount) { return true; }
            return false;
        },

        _isLastItem: function() {
            if ((this.rowIndex * this.maxPerCol + this.colIndex) == this.unlockCount) { return true; }
            return false;
        },

        _isLastRow: function() {
            return this.rowIndex != this.maxRow - 1;
        }
    });
});