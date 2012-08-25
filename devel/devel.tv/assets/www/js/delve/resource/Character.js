define(["dojo/_base/array",
        "delve/resource/Resource"], function(array, resource){
    var module = dojo.declare("delve.resource.Character", [resource], {
        name: 'character',
        hp: 0,
        skills: [],
        skillIdx: 0,
        hurt: function(h) {
            this.hp -= h;
            if (this.hp < 0) { this.hp = 0; }
        },
        die: function() {
            this.hp = 0;
        },
        isDead: function () {
            return this.hp === 0 ? true: false;
        }
    });
    delve.resource.Character.TYPE = {
        'SPIDER': "Spider",
        'WARRIOR': "Warrior",
        'ROGUE': "Rogue",
        'WIZARD': "Wizard",
        'CLERIC': "Cleric"
    };
    delve.resource.Character.match = function(skills, dices, start, len) {
        for (var i=start; i<len; i++) {
            for (var j=0, jlen=skills.length; j<jlen; j++) {
                if (skills[j].match(dices[i])) {
                    return skills[j];
                }
            }
        }
        return null;
    };
    delve.resource.Character.execute = function(source, target) {
        var start = source.start, skill = source.skill,
            range = skill.range, count = 0;
        array.forEach(target.instances, function(inst) {
            if (inst.isDead()) { return; }
            if (count === range) { return; }
            count += 1;
            skill.affect(inst);
        });
    };
    return module;
});