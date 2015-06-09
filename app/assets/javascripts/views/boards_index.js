TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST['board_index'],

  className: 'boards-index',

  events: {
    'submit form.add-board-button': 'addBoard',
  },

  initialize: function () {
    this.listenTo(this.collection, "add", this.addBoardsIndexItemView);
    this.listenTo(this.collection, "remove", this.removeBoardsIndexItemView);
    this.collection.each(this.addBoardsIndexItemView.bind(this));
  },

  render: function () {
    var content = this.template({ });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBoardsIndexItemView: function (boardsIndexItem) {
    var subview = new TrelloClone.Views.BoardsIndexItem({
      model: boardsIndexItem,
      attributes: {
        href: "#/boards/" + boardsIndexItem.id
      }
    });
    this.addSubview('ul.list-group', subview);
  },

  removeBoardsIndexItemView: function (boardsIndexItem) {
    this.removeModelSubview('ul.list-group', boardsIndexItem);
  },

  addBoard: function (event) {
    var successfulAdd = function () {
      this.collection.add(newBoard);
    }.bind(this);

    var displayError = function (model, response) {
      response.responseJSON.forEach(function (error) {
        alert(error);
      });
    };

    event.preventDefault();

    var attributes = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(attributes);

    newBoard.save([], { wait: true, success: successfulAdd, error: displayError });
  },

  addList: function(event) {

  }

});
