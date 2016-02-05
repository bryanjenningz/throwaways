function move(state) {
  var snake = state.snake, direction = state.direction;
  var directions = {
    left: function(c) { return {x: c.x - 10 , y: c.y}; },
    right: function(c) { return {x: c.x + 10, y: c.y}; },
    up: function(c) { return {x: c.x, y: c.y - 10}; },
    down: function(c) { return {x: c.x, y: c.y + 10}; }
  };
  var moveHead = directions[direction];
  var head = [moveHead(snake[0])];
  var body = snake.slice(1).map(function(_, i) { return snake[i]; });
  return head.concat(body);
}

function eat(state) {
  var snake = state.snake, prevSnake = state.prevSnake;
  var tail = prevSnake[prevSnake.length - 1];
  return snake.concat(tail);
}

function isCollision(state) {
  var snake = state.snake, otherSnake = state.otherSnake, 
    width = state.width, height = state.height;
  return snake.some(function(block) {
    return (
      block.x < 0 || block.x >= width ||
      block.y < 0 || block.y >= height || 
      otherSnake.some(function(otherBlock) {
        return otherBlock.x === block.x && otherBlock.y === block.y;
      })
    );
  });
}

function isOverlapping(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isFoodEaten(state) {
  var head = state.snake[0], food = state.food;
  return isOverlapping(head, food);
}

function isFoodTouchingSnakes(food, state) {
  var snake = state.snake, otherSnake = state.otherSnake;
  var isOverlappingFood = isOverlapping.bind(null, food);
  return snake.some(isOverlappingFood) || otherSnake.some(isOverlappingFood);
}

function getNewFood(state) {
  var food = {}, width = state.width, height = state.height;
  food.x = Math.floor(Math.random() * width);
  food.y = Math.floor(Math.random() * height);
  while (isFoodTouchingSnakes(food, state)) {
    food.x = Math.floor(Math.random() * width);
    food.y = Math.floor(Math.random() * height);
  }
  return food;
}

function isTimeToUpdate(state) {
  return state.lastChange + 100 <= new Date().getTime();
}

function draw(state) {
  var context = state.context, snake = state.snake;
  context.clearRect(0, 0, 300, 300);
  snake.forEach(function(block) {
    context.fillRect(block.x, block.y, 10, 10);
  });
}

function update(state) {
  if (isTimeToUpdate(state)) {
    if (isCollision(state)) {
      return;
    }
    var snake = move(state);
    if (isFoodEaten(state)) {
      state.food = getNewFood(state);
      state.points += 1;
    }
    state.lastChange = new Date().getTime();
    state.prevSnake = state.snake;
    state.snake = snake;
    draw(state);
  }
  requestAnimationFrame(function() { update(state); });
}

var state = {
  snake: [{x: 1, y: 50}],
  prevSnake: [{x: 0, y: 50}],
  otherSnake: [{x: 98, y: 50}],
  direction: 'right',
  food: {x: 50, y: 50},
  lastChange: new Date().getTime(),
  context: document.querySelector('#game').getContext('2d'),
  height: 300,
  width: 300,
};

function init(state) {
  update(state);
  addEventListener('keydown', function(event) {
    var UP = 38;
    var DOWN = 40;
    var LEFT = 37;
    var RIGHT = 39;
    var key = event.keyCode;
    if (key === LEFT) {
      state.direction = 'left';
    } else if (key === RIGHT) {
      state.direction = 'right';
    } else if (key === UP) {
      state.direction = 'up';
    } else if (key === DOWN) {
      state.direction = 'down';
    }
  });
}

init(state);
