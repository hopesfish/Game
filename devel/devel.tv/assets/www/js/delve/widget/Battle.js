define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/dom-attr",
         "dojo/dom-class",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/Battle.html",
         "delve/base",
         "delve/event/EventMixin",
         "delve/resource/Stage",
         "delve/widget/CharacterList",
         "delve/widget/CharacterInfo",
         "dojo/NodeList-dom" ], function(dojo, declare, domAttr, domClass, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin, stage, CharacterList, CharacterInfo){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        selected: 'daemon',
        postMixInProperties: function() {
            this.stage = delve.resource.Stage.get(this.stageId);
        },
        postCreate: function() {
            var daemonList, daemonInfo, heroList, heroInfo;

            this.title.innerHTML = this.stage.getFullName();

            daemonList = this.daemonList = new CharacterList({characters: this.stage.getDaemonDefinition()});
            daemonList.placeAt(this.daemonZone, 'last');

            daemonInfo = this.daemonInfo = new CharacterInfo();
            daemonInfo.placeAt(this.daemonZone, 'last');

            heroList = this.heroList = new CharacterList({characters: this.stage.getHeroDefinition()});
            heroList.placeAt(this.heroZone, 'last');

            heroInfo = this.heroInfo = new CharacterInfo();
            heroInfo.placeAt(this.heroZone, 'last');

            this.inherited(arguments);
            this.toggle();
        },
        onUp: function() {
            this.toggle();
        },
        onDown: function() {
            this.toggle();
        },
        toggle: function() {
            var selected = this.selected;
            if (selected === 'daemon') {
                this.selected = 'hero';
                this.heroList.enable();
                this.heroInfo.enable();
                this.daemonList.disable();
                this.daemonInfo.disable();
                domClass.remove(this.daemonZone, "selected");
                domClass.add(this.heroZone, "selected");
            } else {
                this.selected = 'daemon';
                this.heroList.disable();
                this.heroInfo.disable();
                this.daemonList.enable();
                this.daemonInfo.enable();
                domClass.add(this.daemonZone, "selected");
                domClass.remove(this.heroZone, "selected");
            }
        }
    });
});