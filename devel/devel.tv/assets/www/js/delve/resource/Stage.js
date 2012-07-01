define([ "dojo/_base/array",
         "delve/resource/Resource"], function(array, resource){
    var module = dojo.declare("delve.resource.Stage", [resource], {
        save: function() {
            console.info('save');
        },
        getFullName: function() {
            return '第' + this.get('id') + '关 ' + this.get('name');
        },
        getDaemonDefinition: function() {
            return array.filter(this.get('characters'), 
                    function(character) { return character.daemon; });
        },
        getHeroDefinition: function() {
            return array.filter(this.get('characters'), 
                    function(character) { return !character.daemon; });
        }
    });
    delve.resource.Stage.all = function() {
        return [{
            id:1,
            locked: false
        },{
            id:2,
            locked: false
        },{
            id:3,
            locked: false
        },{
            id:4,
            locked: false
        },{
            id:5,
            locked: false
        },{
            id:6,
            locked: false
        },{
            id:7,
            locked: false
        },{
            id:8,
            locked: true
        },{
            id:9,
            locked: true
        },{
            id:10,
            locked: true
        }];
    }
    delve.resource.Stage.get = function() {
        return new delve.resource.Stage({
            id: 1,
            name: '小试身手',
            characters: [{
                type: 'Spider',
                count: 1,
                daemon: true
            }, {
                type: 'Warrior',
                count: 1,
                daemon: false
            }, {
                type: 'Rogue',
                count: 1,
                daemon: false
            }, {
                type: 'Wizard',
                count: 1,
                daemon: false
            }, {
                type: 'Cleric',
                count: 1,
                daemon: false
            }]
        });
    }
    return module;
});