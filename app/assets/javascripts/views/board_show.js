TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['board_show'],

  className: 'main-display',

  initialize: function() {
    this.listenTo(this.collection, "add", this.addListItemView);
    this.listenTo(this.collection, "remove", this.removeListItemView);
    this.collection.each(this.addListItemView.bind(this));
  },

  render: function() {
    var content = this.template({ });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addListItemView: function(listItem) {
    var subview = new TrelloClone.Views.ListItem({
      collection: listItem.cards()
    });
    this.addSubview("div.list-items", subview);
  },

  removeListItemView: function(listItem) {
    this.removeModelSubview("div.list-items", listItem);
  }

});
