define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/_base/array",
         "dojo/dom-attr",
         "dojo/dom-construct",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/CharacterList.html",
         "delve/base",
         "delve/event/EventMixin",
         "dojo/NodeList-dom" ], function(dojo, declare, array, domAttr, domConstruct, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        selected: 0,
        templateString: template,
        postCreate: function() {
            var that = this;
            this.inherited(arguments);
            array.forEach(this.characters, function(character) {
                domConstruct.place(
                        '<div class="character actived ' + character.type.toLowerCase() + '"></div>',
                        that.container, 'last');
            });
            this.unwatch(); // 需要战斗画面激活
            this.select();
        },
        enable: function() {
            this.watch();
        },
        disable: function() {
            this.unwatch();
        },
        select: function() {
            query('div.selected', this.container).removeClass("selected");
            query('div:nth-child(' + (this.selected + 1) +')', this.container).addClass("selected");
        },
        onLeft: function() {
            var len = this.characters.length;
            this.selected -=1;
            if (this.selected < 0) {
                this.selected = len - 1;
            }
            this.select();
        },
        onRight: function() {
            var len = this.characters.length;
            this.selected +=1;
            if (this.selected == len) {
                this.selected = 0;
            }
            this.select();
        },
    });
});