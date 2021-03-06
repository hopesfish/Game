require([ "delve/widget/WidgetManager",
          "delve/widget/Menu",
          "delve/event/adapter/PCKeyboardAdapter",
          "dojo/domReady!" ], function(WidgetManager, Menu, Adapter){
    
    var adapter = new Adapter();
    adapter.watch();

    var manager = new WidgetManager();
    manager.watch();
    manager.select(Menu);

});