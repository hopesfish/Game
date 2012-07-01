define([ "delve/resource/character/Hero"], function(hero){
    var module = dojo.declare([hero], {
        name: '法师',
        hp: 3,
        skills: [{
            desc: '寒冰箭 ：3 个相同数。这个回合，怪物少投 2 个骰子。'
        }, {
            desc: '闪电链 ：4 个相同数。每个目标受到1 点伤害。'
        }, {
            desc: '火球术 ：5 个相同数。6 点伤害，可以分配给多个目标。 '
        }, {
            desc: '即死 ： 6 个相同数。直接杀死这场战斗中的所有怪物。'
        }]
    });
    return module;
});