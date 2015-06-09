TrelloClone.Views.CardItem = Backbone.CompositeView.extend({

  template: JST['card_item'],

  className: "card",

  events: {
    'click .delete-card': 'deleteCard'
  },

  initialize: function() {
    // this.listenTo(this.collection, "add", this.addCardItemView);
    // this.listenTo(this.collection, "remove", this.removeCardItemView);
    // this.collection.each(this.addCardItemView.bind(this));
  },

  render: function() {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  // },
  //
  // addCardItemView: function(cardItem) {
  //   var subview = new TrelloClone.Views.CardItem({});
  //   this.addSubview("ul.card-items", subview);
  // },
  //
  // removeCardItemView: function(cardItem){
  //   this.removeModelSubview("ul.card-items", cardItem)
},

  deleteCard: function(event) {
    event.preventDefault();
    this.model.destroy();
  }
});
