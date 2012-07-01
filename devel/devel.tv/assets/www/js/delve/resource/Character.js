define(["delve/resource/Resource", "delve/resource/Hero"], function(resource){
    var module = dojo.declare("delve.resource.Character", [resource], {
        name: 'character',
        skills: []
    });
    delve.resource.Character.TYPE = {
        'SPIDER': "Spider",
        'WARRIOR': "Warrior",
        'ROGUE': "Rogue",
        'WIZARD': "Wizard",
        'CLERIC': "Cleric"
    };
    delve.resource.Character.initialize = function(type) {
        /*
        switch(type) {
        case delve.resource.Character.TYPE.SPIDER:
            //return new delve.resource.Spider();
            
        break;
        case delve.resource.Character.TYPE.WARRIOR:
            return new delve.resource.Spider();
        break;
        case delve.resource.Character.TYPE.ROGUE:
            return new delve.resource.Rogue();
        break;
        case delve.resource.Character.TYPE.WIZARD:
            return new delve.resource.Wizard();
        break; 
        case delve.resource.Character.TYPE.CLERIC:
            return new delve.resource.Cleric();
        break;
        default:
            throw new Error('undefined character');
            
        }*/
        return {};
    };
    return module;
});