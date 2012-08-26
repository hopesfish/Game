define(["dojo/_base/kernel",
        "dojo/_base/declare",
        "dojo/_base/array",
        "delve/event/EventMixin",
        "delve/base"], function(dojo, delcare, array, eventMixin, base){
    var STEPS = {
        DIC_REQ: 'DIC_REQ', // 开始摇骰
        SEL_SRC: 'SEL_SRC', // 选择源角色
        SEL_REV: 'SEL_REV', // 阵营焦点切换
        SEL_TAG: 'SEL_TAG', // 选择目标角色
        ACT_EXE: 'ACT_EXE'  // 执行动作
    }, REVERSE_COUNT = 0, EVENTS = base.EVENTS, heroDiceRule, damonDiceRule;

    var module = dojo.declare("delve.engine.Engine", [eventMixin], {
        daemons: null,
        heros: null,
        isHeroAttack: true, // 英雄是否是进攻方
        isWin: false, // 英雄是否赢了
        isLost: false, // 英雄是否败了
        step: STEPS.DIC_REQ, // 当前步骤
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
        reverse: function() {
            this.isHeroAttack = !this.isHeroAttack;
            this.step = STEPS.DIC_REQ;
            REVERSE_COUNT = 0;
            this.toggleBattle();
        },
        next: function() {
            if (!base.autoplay) { return; }
            if (this.isWin || this.isLost) {
                this.publish(EVENTS.MESSAGE, ['战斗结束!']);
                return;
            }
            console.info(this.step);
            switch(this.step) {
                case STEPS.DIC_REQ:
                    this.publish(EVENTS.MESSAGE, ['准备投掷骰子!']);
                    this.step = STEPS.SEL_SRC;
                    this.sendDiceRequest(); // 必须在上一行后面
                break;
                case STEPS.SEL_SRC:
                    this.publish(EVENTS.MESSAGE, ['投掷结果:'+ this.dices + '<br>请选择可用角色!']);
                    this.selectSourceCharacter();
                    this.step = STEPS.SEL_REV;
                break;
                case STEPS.SEL_REV:
                    switch (REVERSE_COUNT) {
                    case 0: // 选择目标
                        this.step = STEPS.SEL_TAG;
                        REVERSE_COUNT += 1;
                        this.toggleBattle();
                        break;
                    case 1: // 执行技能
                        this.step = STEPS.ACT_EXE;
                        REVERSE_COUNT += 1;
                        this.next();
                        break;
                    case 2: // 攻击阵营转换
                        this.publish(EVENTS.MESSAGE, ['轮换攻击方!']);
                        this.toggleBattle();
                        this.reverse();
                        break;
                    }
                break;
                case STEPS.SEL_TAG:
                    this.publish(EVENTS.MESSAGE, ['选择目标!']);
                    this.selectTargetCharacter();
                    this.step = STEPS.SEL_REV;
                break;
                case STEPS.ACT_EXE:
                    this.publish(EVENTS.MESSAGE, ['攻击!']);
                    this.execution();
                    this.step = STEPS.SEL_REV;
                break;
                default:
                break;
            }
        },
        getLiveCount: function(characters) {
            var count = 0;
            array.forEach(characters, function(character) {
                array.forEach(character.instances, function(inst) {
                    if (!inst.isDead()) {
                        count += 1;
                    }
                });
            });
            return count;
        },
        sendDiceRequest: function() {
            this.publish(EVENTS.DICE_REQUEST, [{
                isHeroAttack: this.isHeroAttack,
                daemonCount: this.getLiveCount(this.daemons)
            }]);
        },
        filterCharacters: function() {
            var isHeroAttack = this.isHeroAttack, characters, found = start = 0;

            characters =  isHeroAttack === true ? this.heros: this.daemons;

            array.forEach(characters, function(character) {
                if (!character.clazz.match) { return; }
                var count = this.getLiveCount([character]),
                    skill = character.clazz.match(character.clazz.skills, this.dices, start, count);
                if (skill != null && count > 0) {
                    found += 1;
                    character.enabled = true;
                    character.start = start;
                    character.skill = skill;
                } else {
                    character.enabled = false;
                    delete character.start;
                    delete character.skill;
                }
                // 需判断怪兽每个instance对应那个dice
                isHeroAttack ? start = 0: start += count;
            }, this);

            if (found > 0) { 
                this.publish(EVENTS.CHARACTER_LIST_REFRESH);
            } else { // 攻击阵营转换
                this.publish(EVENTS.MESSAGE, ['无可用角色，切换阵营!']);
                this.reverse();
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
            var that = this;
            console.info('execute');
            delve.resource.Character.execute(this.source, this.target, this.dices);
            console.info('source');
            array.forEach(this.source.instances, function(inst) {
                console.info(inst.name + ' ' + inst.hp);
            });
            console.info('target');
            array.forEach(this.target.instances, function(inst) {
                console.info(inst.name + ' ' + inst.hp);
            });
            this.check();
            setTimeout(function() {
                that.publish(EVENTS.BATTLE_REFRESH);
            }, 500);
        },
        check: function() {
            var count = 0;
            array.forEach(this.daemons, function(damon) {
                array.forEach(damon.instances, function(inst) {
                    if (!inst.isDead()) {
                        count += 1;
                    }
                });
            });
            if (count == 0) { this.isWin = true; }

            count = 0;
            array.forEach(this.heros, function(hero) {
                array.forEach(hero.instances, function(inst) {
                    if (!inst.isDead()) {
                        count += 1;
                    }
                });
            });
            if (count == 0) { this.isLost = true; }
        }
    });
    return module;
});