TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({

  template: JST['board_index_item'],

  tagName: 'a',

  className: 'list-group-item boards-index-item',

  events: {
    'click li': 'deleteFeed'
  },

  initialize: function (options) {
  },

  deleteFeed: function(event) {
    event.preventDefault();

    if ($(event.target).is("button.remove-board")) {
      this.model.destroy();
    } else {
      Backbone.history.navigate("#/boards/" + this.model.id);
    }
  },

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.$el.append(this.buttonRemove);
    return this;
  }

});
