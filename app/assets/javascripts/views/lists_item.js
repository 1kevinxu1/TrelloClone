TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['list_item'],

  className: "board-list-item",

  initialize: function() {
    this.listenTo(this.collection, "add", this.addCardItemView);
    this.listenTo(this.collection, "remove", this.removeCardItemView);
    this.collection.each(this.addCardItemView.bind(this));
  },

  render: function() {
    var content = this.template({ list: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCardItemView: function(cardItem) {
    var subview = new TrelloClone.Views.CardItem({});
    addSubview("ul.card-items", subview);
  },

  removeCardItemView: function(cardItem){
    removeModelSubview("ul.card-items", cardItem)
  }
});
