define(["delve/resource/Character"], function(character){
    console.info(character);
    var module = dojo.declare("delve.resource.Daemon", [character], {
    });
    return module;
});