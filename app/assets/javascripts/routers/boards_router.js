TrelloClone.Routers.Boards = Backbone.Router.extend({

  routes: {
    "": "boardsIndex",
    "boards/:id": "boardShow"
  },

  initialize: function (options) {
    this.$main = options.$main;
    this.$sidebar = options.$sidebar;
    this._boards = options._boards;
  },

  boardsIndex: function (callback) {
    this._boards.fetch({
      success: function () {
        callback && callback();
      }
    });
    this.sideView = new TrelloClone.Views.BoardsIndex({
      collection: this._boards
    });
    this._swapView(this._sideView, this.sideView, this.$sidebar);
  },

  boardShow: function(id) {
    if (this._boards.length === 0) {
      this.boardsIndex(this.boardShow.bind(this, id));
    }
    this.selectedBoard = this._boards.getOrFetch(parseInt(id));
    this.mainView = new TrelloClone.Views.BoardShow({
      collection: this.selectedBoard.lists(),
      model: this.selectedBoard
    });
    this._swapView(this._mainView, this.mainView, this.$main);
  },

  _swapView: function (currentView, newView, $el) {
    currentView && currentView.remove();
    currentView = newView;
    $el.html(newView.render().$el);
  }

});
