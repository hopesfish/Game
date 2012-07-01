define(["delve/resource/character/Hero"], function(hero){
    var module = dojo.declare("delve.resource.Cleric", [hero], {
        name: '牧师',
        hp: 1,
        skills: [{
            desc: '普通治疗 ：4 个连续数，如2345. 治疗 2 点生命，可加在不同的角色身上。'
        }, {
            desc: '高级治疗 ： 5 个连续数，如 12345. 治疗量为第 6 个骰子的数值。可加在不同冒险者身上。另外，如果第 6 个骰子是 1，为每个角色加 1 点生命。'
        }, {
            desc: '奇迹 ： 6 个连续数，即 123456. 所有角色满血满状态原地复活。 '
        }]
    });
    return module;
});