define(["delve/resource/Resource"], function(resource){
    var module = dojo.declare("delve.resource.Character", [resource], {
        name: 'character',
        hp: 0,
        skills: [],
        skillIdx: 0
    });
    delve.resource.Character.TYPE = {
        'SPIDER': "Spider",
        'WARRIOR': "Warrior",
        'ROGUE': "Rogue",
        'WIZARD': "Wizard",
        'CLERIC': "Cleric"
    };
    return module;
});