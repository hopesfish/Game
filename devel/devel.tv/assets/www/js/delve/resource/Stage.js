define(["delve/resource/Resource"], function(resource){
    var module = dojo.declare("delve.resource.Stage", [resource], {
        save: function() {
            console.info('save');
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
    return module;
});