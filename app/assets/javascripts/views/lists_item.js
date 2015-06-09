TrelloClone.Views.ListItem = Backbone.CompositeView.extend({

  template: JST['list_item'],

  className: "list",

  events: {
    'click .show-form': 'showForm',
    'click div.form-button': 'render',
    'submit form': 'addCard'
  },

  initialize: function() {
    this.listenTo(this.collection, "add", this.addCardItemView);
    this.listenTo(this.collection, "remove", this.removeCardItemView);
    this.collection.each(this.addCardItemView.bind(this));
  },

  render: function() {
    var content = this.template({ list: this.model, show: this.show });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addCardItemView: function(cardItem) {
    var subview = new TrelloClone.Views.CardItem({
      model: cardItem
    });
    this.addSubview(".card-items", subview, true);
  },

  removeCardItemView: function(cardItem){
    this.removeModelSubview(".card-items", cardItem);
  },

  showForm: function(event) {
    event.preventDefault();
    $(event.currentTarget).remove();
    var cardForm = new TrelloClone.Views.CardItemNew({ model: this.model });
    this.$el.append(cardForm.render().$el);
  },

  addCard: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    var newCard = new TrelloClone.Models.Card(attributes);

    var successfulAdd = function () {
      this.collection.add(newCard);
      this.render();
    }.bind(this);

    var displayError = function (model, response) {
      response.responseJSON.forEach(function (error) {
        alert(error);
      });
    };

    newCard.save([], { wait: true, success: successfulAdd, error: displayError });
  }

});
