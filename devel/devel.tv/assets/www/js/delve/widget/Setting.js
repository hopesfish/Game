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
        selectedNode: null,
        count: 0,
        step: 10,
        bgVolume : 0,

        postCreate: function() {
            this.inherited(arguments);
            this.count = query(".setting", this.settingContainer).length;
            this.bgVolume = base.SETTING.bgVolume;
            this.select();
            this.adjust(this.bgVolume);
        },

        adjust: function(volume) {
            var selectedNode = this.selectedNode, type, cursorNode, volumeNode;

            domAttr.set(selectedNode, 'data-delve-volume', volume);
            cursorNode = query('.cursor', selectedNode)[0];
            domStyle.set(cursorNode, 'left', volume + '%');
            volumeNode = query('.volume', selectedNode)[0];
            volumeNode.innerHTML = volume + '%';

            type = domAttr.get(selectedNode, 'data-delve-volume-type');
            switch (type) {
                case 'bgVolume':
                    this.bgVolume = volume;
                    dojo.byId('bgAudio').volume = volume / 100;
                break;
                default:
            }
        },
        
        select: function() {
            query('div.selected', this.settingContainer).removeClass("selected");
            query('div.setting:nth-child(' + (this.selected + 1) +')', this.settingContainer).addClass("selected");
            this.selectedNode = query('div.selected', this.settingContainer)[0];
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
            var volume = 0, selectedNode = this.selectedNode,
                cursorNode, volumeNode;
            volume = parseInt(domAttr.get(selectedNode, 'data-delve-volume'), 10);
            if (volume === 0) { return; }
            volume -= this.step;
            this.adjust(volume);
        },

        onRight: function() {
            var volume = 0, selectedNode = this.selectedNode,
                cursorNode, volumeNode;
            volume = parseInt(domAttr.get(selectedNode, 'data-delve-volume'), 10);
            if (volume === 100) { return; }
            volume += this.step;
            this.adjust(volume);
        }
    });
});