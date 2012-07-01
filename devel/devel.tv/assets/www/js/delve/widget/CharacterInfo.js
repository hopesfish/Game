define([ "dojo/_base/kernel",
         "dojo/_base/declare",
         "dojo/_base/array",
         "dojo/dom-construct",
         "dojo/query",
         "dijit/_Widget",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/CharacterInfo.html",
         "delve/base",
         "delve/event/EventMixin"], function(dojo, declare, array, domContruct, query, widget, templatedMixin, widgetsInTemplateMixin, template, base, eventMixin){
    // declare our custom class
    return dojo.declare([widget, templatedMixin, widgetsInTemplateMixin, eventMixin], {
        _watch: false,
        templateString: template,
        character: null,
        skillIdx: 0,
        postCreate: function() {
            this.inherited(arguments);
            // watch character info
            // watch character skil switch event
        },
        onSubscribe: function(event, data) {
            var EVENTS = base.EVENTS, character = data[0];
            if (event === EVENTS.CHARACTER_INSTANCE_SELECT) {
                this.character = character;
                this.skillIdx = character.skillIdx;
                this.render();
                this.selectSkill();
            }
        },
        render: function() {
            var character = this.character, hp = character.hp;
            this.titleContainer.innerHTML = character.get('name');
            domContruct.empty(this.hpContainer);
            while (hp > 0) {
                domContruct.place('<span class="blood">&nbsp</span>', this.hpContainer, 'last');
                hp--;
            }
        },
        selectSkill: function() {
            var skills = this.character.skills;
            this.character.skillIdx = this.skillIdx;
            domContruct.empty(this.skillsContainer);
            this.skillsContainer.innerHTML = skills[this.skillIdx].desc;
        },
        onUp: function() {
            var len = this.character.skills.length;
            this.skillIdx -= 1;
            if (this.skillIdx < 0) { this.skillIdx = len - 1; }
            this.selectSkill();
        },
        onDown: function() {
            var len = this.character.skills.length;
            this.skillIdx += 1;
            if (this.skillIdx == len) { this.skillIdx = 0; }
            this.selectSkill();
        }
    });
});