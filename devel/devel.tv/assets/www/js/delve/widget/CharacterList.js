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
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        _watch: false,
        selected: 0,
        instances: [],
        templateString: template,
        postCreate: function() {
            this.inherited(arguments);
            this.init(); // 创建角色实体
            this.render(); // 绘制角色
            this.select();
        },
        init: function() {
            array.forEach(this.characters, function(character) {
                var count = character.count;
                character.instances = [];
                while(count !=0 ) {
                    character.instances.push(delve.resource.CharacterFactory.initialize(character.type));
                    count--;
                }
            });
        },
        render: function() {
            var that = this;
            array.forEach(this.characters, function(character) {
                domConstruct.place(
                        '<div class="character actived ' + character.type.toLowerCase() + '"></div>',
                        that.container, 'last');
            });
        },
        enable: function() {
            this.inherited(arguments);
            this.select();
        },
        select: function() {
            var EVENTS = base.EVENTS, instances = this.characters[this.selected].instances, instance;
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
        }
    });
});