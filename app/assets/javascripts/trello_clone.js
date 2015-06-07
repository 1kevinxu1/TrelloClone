window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.boardsRouter = new TrelloClone.Routers.Boards({
      $main: $("div#main"),
      $sidebar: $("div#sidebar"),
      _boards: new TrelloClone.Collections.Boards()
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  TrelloClone.initialize();
});
