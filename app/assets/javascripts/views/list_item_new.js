TrelloClone.Views.ListItemNew = Backbone.CompositeView.extend({

  template: JST['list_item_form'],

  initialize: function() {
  },

  render: function() {
    var content = this.template({ boardId: this.model.id });
    this.$el.html(content);
    // this.attachSubviews();
    return this;
  }

  // addCardItemView: function(cardItem) {
  //   var subview = new TrelloClone.Views.CardItem({});
  //   this.addSubview("ul.card-items", subview);
  // },
  //
  // removeCardItemView: function(cardItem){
  //   this.removeModelSubview("ul.card-items", cardItem)
  // },

  // toggleShow: function() {
  //   debugger;
  //   this.showForm = this.showForm ? false : true;
  //   return this.render();
  // }

});
