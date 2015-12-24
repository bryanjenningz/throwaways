var filterList = (function() {
  // data
  var state = {filter: 'all'};
  var filterChoices = [
    {text: 'All', type: 'all', selected: true},
    {text: 'Active', type: 'active', selected: false},
    {text: 'Completed', type: 'completed', selected: false}
  ];

  // cache DOM
  var $el = $('.filter-list');
  var template = Handlebars.compile($el.find('#filter-list-template').html());

  // bind events
  $el.delegate('span', 'click', selectOption);

  function render() {
    var data = {filterChoices: filterChoices};
    $el.html(template(data));
  }

  function selectOption(event) {
    var selectedType = (typeof event === 'string') ? event : $(this).data('type');
    var selected = filterChoices.filter(function(choice) { return choice.type === selectedType; })[0];
    selected.selected = true;
    var unselected = filterChoices.filter(function(choice) { return choice.type !== selectedType; });
    unselected.forEach(function(choice) { choice.selected = false; });
    state.filter = selectedType;
    render();
    $el.trigger('filterSelected', {filter: selectedType});
  }

  render();

  return {
    state: state
  };
})();

var todos = (function() {
  // data
  var todos = [];
  var nextId = 0;

  // cache DOM
  var $el = $('.todos');
  var $addTodoForm = $el.find('form');
  var $input = $el.find('input');
  var $ul = $el.find('ul');
  var template = Handlebars.compile($el.find('#todos-template').html());

  // bind events
  $addTodoForm.on('submit', addTodo);
  $ul.delegate('li', 'click', toggleTodoStatus);
  $('body').on('filterSelected', render)

  function render() {
    var data = {todos: filterTodos(filterList.state.filter)};
    $ul.html(template(data));
  }

  // todos API functions
  function addTodo(event) {
    event.preventDefault();
    var text;
    if (typeof event === 'string') {
      text = event;
    } else {
      if ($input.val() === '') return;
      text = $input.val();
    }
    var todo = {id: nextId++, text: text, completed: false};
    todos.push(todo);
    $input.val('');
    render(filterList.state.filter);
  }

  function filterTodos(type) {
    switch(type) {
      case 'all': return todos;
      case 'active': return todos.filter(function(todo) { return !todo.completed; });
      case 'completed': return todos.filter(function(todo) { return todo.completed });
    }
  }

  function toggleTodoStatus(event) {
    var toggledId = $(this).data('id');
    var todo = todos.filter(function(todo) { return todo.id === toggledId; })[0];
    todo.completed = !todo.completed;
    render(filterList.state.filter);
  }

  render();

  return {
    addTodo: addTodo
  };
})();
