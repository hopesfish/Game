define(["delve/resource/character/Spider",
        "delve/resource/character/Warrior",
        "delve/resource/character/Rogue",
        "delve/resource/character/Cleric",
        "delve/resource/character/Wizard",], function(Spider, Warrior, Rogue, Cleric, Wizard){
    var module = dojo.declare("delve.resource.CharacterFactory", [], {
    });
    delve.resource.CharacterFactory.initialize = function(type) {
        switch(type) {
        case delve.resource.Character.TYPE.SPIDER:
            return new Spider();
        break;
        case delve.resource.Character.TYPE.WARRIOR:
            return new Warrior();
        break;
        case delve.resource.Character.TYPE.ROGUE:
            return new Rogue();
        break;
        case delve.resource.Character.TYPE.WIZARD:
            return new Wizard();
        break; 
        case delve.resource.Character.TYPE.CLERIC:
            return new Cleric();
        break;
        default:
            throw new Error('undefined character');
        }
        return {};
    };
    delve.resource.CharacterFactory.getClazz = function(type) {
        switch(type) {
        case delve.resource.Character.TYPE.SPIDER:
            return Spider;
        break;
        case delve.resource.Character.TYPE.WARRIOR:
            return Warrior;
        break;
        case delve.resource.Character.TYPE.ROGUE:
            return Rogue;
        break;
        case delve.resource.Character.TYPE.WIZARD:
            return Wizard;
        break; 
        case delve.resource.Character.TYPE.CLERIC:
            return Cleric;
        break;
        default:
            throw new Error('undefined character');
        }
        return {};
    };
    return module;
});