define([ "delve/resource/character/Daemon"], function(deamon){
    var module = dojo.declare([deamon], {
        name: '蜘蛛',
        hp: 1,
        skills: [{
            desc: '骰子点数为5或者6时，任意一名英雄受到伤害1点。'
        }]
    });
    return module;
});