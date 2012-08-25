define([ "delve/resource/character/Hero"], function(Hero){
    var skills, module;
    skills =  [{
        desc: '冲锋 ： 每个 6 造成 1 点伤害，但是每回合最多使用 2 个 6 用来冲锋。',
        match: function(dices) {
            return /[6]+/.test(dices);
        },
        max: 2,
        range: 1,
        affect: function(target) {
            target.hurt(1);
        }
    }];
    module = dojo.declare([Hero], {
        name: '战士',
        hp: 6,
        skills: skills
    });
    module.skills = skills;
    module.match = delve.resource.Character.match;
    return module;
});