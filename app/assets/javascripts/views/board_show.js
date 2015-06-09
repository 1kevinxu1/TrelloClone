TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({

  template: JST['board_show'],

  className: 'main-display',

  events: {
    'click .new-list': 'showForm',
    'click div.form-button-list': 'render',
    'submit form.list-form': 'addList'
  },

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
      model: listItem,
      collection: listItem.cards()
    });
    this.addSubview("div.list-items", subview);
  },

  removeListItemView: function(listItem) {
    this.removeModelSubview("div.list-items", listItem);
  },

  showForm: function(event) {
    event.preventDefault();
    $(event.currentTarget).remove();
    var cardForm = new TrelloClone.Views.ListItemNew({
      model: this.model
    });
    this.$el.append(cardForm.render().$el);
    this.$el.append(cardForm.render().$el);
  },

  addList: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    var newList = new TrelloClone.Models.List(attributes);

    var successfulAdd = function () {
      this.collection.add(newList);
      this.render();
    }.bind(this);

    var displayError = function (model, response) {
      response.responseJSON.forEach(function (error) {
        alert(error);
      });
    };

    newList.save([], { wait: true, success: successfulAdd, error: displayError });
  }

});
