$(function() {
  'use strict';
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var utils = {
    store: function(namespace, value) {
      if (arguments.length > 1) {
        localStorage.setItem(namespace, JSON.stringify(value));
      } else {
        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
      }
    }
  };

  var todos = {
    init: function() {
      this.todoTemplate = Handlebars.compile($('#todo-template').html());
      this.$todosList = $('#todos-list');
      this.todos = utils.store('todos');
      this.bindEvents();
      this.render();
    },
    bindEvents: function() {
      $('#new-todo').on('keyup', this.create.bind(this));
      $('#todos-list')
        .on('click', '.destroy', this.destroy.bind(this))
        .on('click', '.toggle', this.toggle.bind(this))
        .on('dblclick', '.info', this.edit.bind(this))
        .on('focusout', '.edit', this.unedit.bind(this))
        .on('keyup', '.edit', this.makeEdit.bind(this));
    },
    create: function(e) {
      var text = $(e.target).val().trim();
      if (e.keyCode !== ENTER_KEY || text === '') {
        return;
      }
      this.todos.push({id: Math.random() + '', text: text, completed: false});
      $(e.target).val('');
      this.render();
    },
    render: function() {
      this.$todosList.html(this.todoTemplate(this.todos));
      utils.store('todos', this.todos);
    },
    destroy: function(e) {
      var i = this.elementToIndex(e.target);
      this.todos.splice(i, 1);
      this.render();
    },
    elementToIndex: function(element) {
      var id = $(element).closest('.todo').attr('data-id');
      var i = this.todos.length;
      while (i--) {
        if (this.todos[i].id === id) return i;
      }
    },
    toggle: function(e) {
      var i = this.elementToIndex(e.target);
      this.todos[i].completed = !this.todos[i].completed;
      this.render();
    },
    edit: function(e) {
      var todo = $(e.target).closest('.todo').addClass('editing').find('.edit');
      todo.val(todo.val()).focus();
    },
    unedit: function(e) {
      $(e.target).closest('.todo').removeClass('editing');
    },
    makeEdit: function(e) {
      if (e.keyCode === ENTER_KEY) {
        var i = this.elementToIndex(e.target);
        this.todos[i].text = $(e.target).val();
        this.render();
      }
    }
  };

  todos.init();
});
