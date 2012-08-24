define(["dojo/_base/kernel",
        "dojo/_base/declare",
        "dojo/_base/array",
        "delve/event/EventMixin",
        "delve/base"], function(dojo, delcare, array, eventMixin, base){
    var STEPS = {
        DIC_REQ: 'DIC_REQ',
        SEL_SRC: 'SEL_SRC',
        SEL_REV: 'SEL_REV',
        SEL_TAG: 'SEL_TAG',
        ACT_EXE: 'ACT_EXE'
    }, REVERSE_COUNT = 0, EVENTS = base.EVENTS;
    var module = dojo.declare("delve.engine.Engine", [eventMixin], {
        daemons: null,
        heros: null,
        attack: true, // 英雄是否进攻
        step: STEPS.DIC_REQ, // 当前step
        source: null,
        target: null,
        constructor: function() {
            this.inherited(arguments);
            dojo.mixin(this, arguments[0]);
        },
        init: function() {
            this.watch();
        },
        onEnter: function() {
            this.next();
        },
        onSubscribe: function(event, data) {
            // 接受RESPONSE
            if (event === EVENTS.DICE_RESPONSE) {
                this.dices = data[0];
                console.info(this.dices);
                this.filterCharacters();
            } else if (event === EVENTS.CHARACTER_SOURCE_RESPONSE) {
                this.source = data[0];
            } else if (event === EVENTS.CHARACTER_TARGET_RESPONSE) {
                this.target = data[0];
            }
        },
        destroy: function() {
            clearInterval(this.interval);
            this.unwatch();
        },
        next: function() {
            if (!base.autoplay) { return; }
            console.info(this.step);
            switch(this.step) {
                case STEPS.DIC_REQ:
                    this.step = STEPS.SEL_SRC;
                    this.sendDiceRequest();
                break;
                case STEPS.SEL_SRC:
                    this.step = STEPS.SEL_REV;
                    this.selectSourceCharacter();
                break;
                case STEPS.SEL_REV:
                    switch (REVERSE_COUNT) {
                    case 0:
                        this.step = STEPS.SEL_TAG;
                        REVERSE_COUNT += 1;
                        break;
                    case 1:
                        this.step = STEPS.ACT_EXE;
                        REVERSE_COUNT += 1;
                        break;
                    case 2:
                        this.step = STEPS.DIC_REQ;
                        REVERSE_COUNT = 0;
                        break;
                    }
                    this.toggleBattle();
                break;
                case STEPS.SEL_TAG:
                    this.step = STEPS.SEL_REV;
                    this.selectTargetCharacter();
                break;
                case STEPS.ACT_EXE:
                    this.step = STEPS.SEL_REV;
                    this.execution();
                break;
                default:
                break;
            }
        },
        sendDiceRequest: function() {
            this.publish(EVENTS.DICE_REQUEST);
        },
        filterCharacters: function() {
            var that = this, attack = this.attack, characters, found = 0;

            characters =  attack === true ? this.heros: this.daemons;

            array.forEach(characters, function(character) {
                if (character.clazz.match) {
                    if (character.clazz.match(character.clazz.skills, that.dices)) {
                        found++;
                        character.enabled = true;
                    } else {
                        character.enabled = false;
                    }
                }
            });
            if (found > 0) { 
                this.publish(EVENTS.CHARACTER_LIST_REFRESH);
            } else {
                this.step = STEPS.DIC_REQ;
            }
        },
        selectSourceCharacter: function() {
            this.publish(EVENTS.CHARACTER_SOURCE_REQUEST);
        },
        toggleBattle: function() {
            this.publish(EVENTS.CHARACTER_LIST_REVERSE);
        },
        selectTargetCharacter: function() {
            this.publish(EVENTS.CHARACTER_TARGET_REQUEST);
        },
        execution: function() {
            console.info('execute');
            console.info(this.source);
            console.info(this.target);
            this.attack = !this.attack;
            this.step = STEPS.SEL_REV;
        }
    });
    return module;
});