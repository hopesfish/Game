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
         "delve/widget/DicePicker",
         "delve/engine/Engine",
         "dojo/NodeList-dom" ], function(dojo, declare, domAttr, domClass, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin, stage, CharacterList, CharacterInfo, DicePicker, Engine){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        templateString: template,
        selected: 'daemon',
        postMixInProperties: function() {
            this.stage = delve.resource.Stage.get(this.stageId);
        },
        postCreate: function() {
            var daemonList, daemonInfo, heroList, heroInfo, dicePicker, engine;

            this.inherited(arguments);

            this.title.innerHTML = this.stage.getFullName();

            daemonList = this.daemonList = new CharacterList({characters: this.stage.getDaemonDefinition()});
            daemonList.placeAt(this.daemonZone, 'last');

            daemonInfo = this.daemonInfo = new CharacterInfo();
            daemonInfo.placeAt(this.daemonZone, 'last');

            heroList = this.heroList = new CharacterList({characters: this.stage.getHeroDefinition()});
            heroList.placeAt(this.heroZone, 'last');

            heroInfo = this.heroInfo = new CharacterInfo();
            heroInfo.placeAt(this.heroZone, 'last');

            this.toggle();

            dicePicker = this.dicePicker = new DicePicker();
            dicePicker.placeAt(this.domNode, "last");

            engine = this.engine = Engine({
                daemons: daemonList.getCharacters(),
                heros: heroList.getCharacters()
            });
            engine.init();
        },
        onSpace: function() {
            this.toggle();
        },
        toggle: function(opts) {
            var selected = this.selected, opts = opts || {isFilter: true};
            if (selected === 'daemon') {
                this.selected = 'hero';
                this.daemonInfo.disable(); // disable first
                this.daemonList.disable();
                this.heroInfo.enable(); // enable info first
                this.heroList.enable(opts);
                domClass.remove(this.daemonZone, "selected");
                domClass.add(this.heroZone, "selected");
            } else {
                this.selected = 'daemon';
                this.heroInfo.disable();
                this.heroList.disable();
                this.daemonInfo.enable();
                this.daemonList.enable(opts);
                domClass.add(this.daemonZone, "selected");
                domClass.remove(this.heroZone, "selected");
            }
        },
        destroy: function() {
            this.engine.destroy();
            this.daemonList.destroy();
            this.daemonInfo.destroy();
            this.heroList.destroy();
            this.heroInfo.destroy();
            this.dicePicker.destroy();
            this.inherited(arguments);
        },
        onSubscribe: function(event, data) {
            var EVENTS = base.EVENTS;
            if (event === EVENTS.CHARACTER_LIST_REVERSE) {
                this.toggle({isFilter: false});
            }
        }
    });
});