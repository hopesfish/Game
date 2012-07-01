define([ "delve/resource/character/Hero"], function(hero){
    var module = dojo.declare([hero], {
        name: '盗贼',
        hp: 3,
        skills: [{
            desc: '偷袭 ： 每个 1 造成 1 点伤害，可以使用任意多的 1，但是每回合只能偷袭一个目标。'
        }, {
            desc: '要害攻击 ：Full house （即一对加 3 个相同数，如 22444），伤害值为第6 个骰子的数值。这个伤害只能用在一个目标上。'
        }]
    });
    return module;
});