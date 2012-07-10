define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/dom-attr",
         "dojo/dom-style",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Setting.html",
         "delve/base",
         "delve/event/EventMixin",
         "dojo/NodeList-dom" ], function(dojo, declare, domAttr, domStyle, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        selected: 0,
        count: 0,
        step: 20,

        postCreate: function() {
            this.inherited(arguments);
            this.count = query(".setting", this.settingContainer).length;
        },

        select: function() {
            query('div.selected', this.settingContainer).removeClass("selected");
            query('div.setting:nth-child(' + (this.selected + 1) +')', this.settingContainer).addClass("selected");
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

        onLeft: function() {
            var volume = 0, selectNode = query('div.selected', this.settingContainer)[0],
                cursorNode, volumeNode;
            volume = parseInt(domAttr.get(selectNode, 'data-delve-volume'), 10);
            if (volume === 0) { return; }
            volume -= this.step;
            domAttr.set(selectNode, 'data-delve-volume', volume);
            cursorNode = query('.cursor', selectNode)[0];
            domStyle.set(cursorNode, 'left', volume + '%');
            volumeNode = query('.volume', selectNode)[0];
            volumeNode.innerHTML = volume + '%';
        },

        onRight: function() {
            var volume = 0, selectNode = query('div.selected', this.settingContainer)[0],
                cursorNode, volumeNode;
            volume = parseInt(domAttr.get(selectNode, 'data-delve-volume'), 10);
            if (volume === 100) { return; }
            volume += this.step;
            domAttr.set(selectNode, 'data-delve-volume', volume);
            cursorNode = query('.cursor', selectNode)[0];
            domStyle.set(cursorNode, 'left', volume + '%');
            volumeNode = query('.volume', selectNode)[0];
            volumeNode.innerHTML = volume + '%';
        }
    });
});