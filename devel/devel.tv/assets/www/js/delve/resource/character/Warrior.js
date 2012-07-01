define([ "delve/resource/character/Hero"], function(hero){
    var module = dojo.declare("delve.resource.Warrior", [hero], {
        name: '战士',
        hp: 6,
        skills: [{
            desc: '冲锋 ： 每个 6 造成 1 点伤害，但是每回合最多使用 2 个 6 用来冲锋。'
        }]
    });
    return module;
});