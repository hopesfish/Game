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
    delve.resource.Character.match = function(skills, dices) {
        var len = skills.length;
        for (var i=0; i<len; i++) {
            if (skills[i].match(dices)) {
                return true;
            }
        }
        return false;
    };
    return module;
});