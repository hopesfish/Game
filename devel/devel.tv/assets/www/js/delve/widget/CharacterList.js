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
         "delve/resource/CharacterFactory",
         "dojo/NodeList-dom" ], function(dojo, declare, array, domAttr, domConstruct, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    var EVENTS = base.EVENTS;
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        _watch: false,
        selected: 0,
        characters: [],
        isFilter: false,
        templateString: template,
        dices: '',
        postCreate: function() {
            this.inherited(arguments);
            this.init(); // 创建角色实体
            this.render(); // 绘制角色
            this.select();
        },
        destroy: function() {
            this.characters = null;
            this.selected = 0;
            this.inherited(arguments);
        },
        init: function() {
            array.forEach(this.characters, function(character) {
                var count = character.count;
                character.enabled = false;
                character.clazz = delve.resource.CharacterFactory.getClazz(character.type);
                character.instances = [];
                while(count !=0 ) {
                    var inst = delve.resource.CharacterFactory.initialize(character.type);
                    character.instances.push(inst);
                    count--;
                }
            });
        },
        render: function() {
            var that = this;
            domConstruct.empty(this.container);
            array.forEach(this.characters, function(character, idx) {
                var actived = 'actived';
                if (that.isFilter) {
                    that.selected = character.enabled ? idx : that.selected;
                    actived = character.enabled ? 'actived' : '';
                }
                domConstruct.place(
                        '<div class="character ' + actived + ' ' + character.type.toLowerCase() + '"></div>',
                        that.container, 'last');
            });
        },
        enable: function() {
            this.inherited(arguments);
            dojo.mixin(this, arguments[0]);
            this.render();
            this.select();
        },
        select: function() {
            var character = this.characters[this.selected],
                instances = character.instances, instance;
            if (!character.enabled && this.isFilter) { return; }
            instance = instances[instances.length - 1];
            query('div.selected', this.container).removeClass("selected");
            query('div:nth-child(' + (this.selected + 1) +')', this.container).addClass("selected");
            this.publish(EVENTS.CHARACTER_INSTANCE_SELECT, [instance]);
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
        getCharacters: function() {
            return this.characters;
        },
        onSubscribe: function(event, data) {
            // 接受RESPONSE
            if (event === EVENTS.CHARACTER_LIST_REFRESH) {
                this.refresh();
            } else if (event === EVENTS.CHARACTER_SOURCE_REQUEST) {
                this.onCharacterSelect({src:true});
            } else if (event === EVENTS.CHARACTER_TARGET_REQUEST) {
                this.onCharacterSelect({src:false});
            }
        },
        refresh: function() {
            this.render();
            this.select();
        },
        pick: function() {
            
        },
        onCharacterSelect: function(opts) {
            var isSrc = opts.src, eventName;
            eventName = isSrc ? EVENTS.CHARACTER_SOURCE_RESPONSE : EVENTS.CHARACTER_TARGET_RESPONSE;
            this.publish(eventName, [this.characters[this.selected]]);
        }
    });
});