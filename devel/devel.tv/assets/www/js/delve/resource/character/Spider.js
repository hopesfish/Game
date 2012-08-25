define([ "delve/resource/character/Daemon"], function(Deamon) {
    var skills =  [{
        desc: '骰子点数为5或者6时，任意一名英雄受到伤害1点。',
        match: function(dices) {
            return /[5-6]+/.test(dices);
        },
        max: 1,
        range: 1,
        affect: function(target) {
            target.hurt(1);
        }
    }];
    var module = dojo.declare([Deamon], {
        name: '蜘蛛',
        hp: 1,
        skills: skills
    });
    module.skills = skills;
    module.match = delve.resource.Character.match;
    return module;
});