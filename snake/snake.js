var state = {
  context: document.querySelector('#game').getContext('2d'),
  snake: [{x: 10, y: 10}, {x: 9, y: 10}],
  direction: 'right',
  food: {x: 150, y: 150}
};

function update(state) {
  clearScreen(state.context);
  drawBlock(state.context, state.snake[0]);
  drawBlock(state.context, state.food);

  state = move(state);
  if (isTouching(state.snake[0], state.food)) {
    state = growSnake(state);
    state = generateFood(state);
  }
  requestAnimationFrame(function() { update(state) });
}

function clearScreen(context) {
  context.clearRect(0, 0, 300, 300);
}

function drawBlock(context, block) {
  context.fillRect(block.x, block.y, 10, 10);
}

function move(state) {
  var direction = state.direction, snake = state.snake;
  var directions = {
    left: {x: -1, y: 0}, right: {x: 1, y: 0}, 
    up: {x: 0, y: -1}, down: {x: 0, y: 1}
  };
  var change = directions[direction];
  var head = snake[0];
  var newSnake = [{x: head.x + change.x, y: head.y + change.y}].concat(snake.slice(0, -1));
  return Object.assign(state, {snake: newSnake});
}

function isTouching(block1, block2) {
  return Math.abs(block1.x - block2.x) < 10 && 
         Math.abs(block1.y - block2.y) < 10;
}

function growSnake(state) {
  var snake = state.snake;
  var tail = snake.slice(-1)[0];
  var beforeTail = snake.slice(-2, -1)[0];
  var tailDirection = {x: beforeTail.x - tail.x, y: beforeTail.y - tail.y};
  return Object.assign(state, {snake: snake.concat({x: tail.x - tailDirection.x, y: tail.y - tailDirection.y})});
}

function generateFood(state) {
  do {
    var xy = randomXY();
  } while (xy.x === state.snake[0].x && xy.y === state.snake[0].y);
  return Object.assign(state, {food: {x: xy.x, y: xy.y}});
}

function randomXY() {
  return {x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300)};
}

addEventListener('keydown', function(event) {
  var directions = {'37': 'left', '38': 'up', '39': 'right', '40': 'down'};
  if (directions[event.keyCode]) {
    state.direction = directions[event.keyCode];
  }
});

update(state);
