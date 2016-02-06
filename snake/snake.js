var state = {
  context: document.querySelector('#game').getContext('2d'),
  user: {x: 10, y: 10, direction: 'right'},
  food: {x: 150, y: 150}
};

function update(state) {
  clearScreen(state.context);
  drawBlock(state.context, state.user);
  drawBlock(state.context, state.food);

  state.user = move(state.user);
  if (isTouching(state.user, state.food)) {
    state.food = generateFood(state);
  }
  requestAnimationFrame(function() { update(state) });
}

function clearScreen(context) {
  context.clearRect(0, 0, 300, 300);
}

function drawBlock(context, block) {
  context.fillRect(block.x, block.y, 10, 10);
}

function move(block) {
  var directions = {
    left: {x: -1, y: 0}, right: {x: 1, y: 0}, 
    up: {x: 0, y: -1}, down: {x: 0, y: 1}
  };
  var change = directions[block.direction];
  return {x: block.x + change.x, y: block.y + change.y, direction: block.direction};
}

function isTouching(block1, block2) {
  return Math.abs(block1.x - block2.x) < 10 && 
         Math.abs(block1.y - block2.y) < 10;
}

function generateFood(state) {
  do {
    var xy = randomXY();
  } while (xy.x === state.user.x && xy.y === state.user.y);
  return xy;
}

function randomXY() {
  return {x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300)};
}

addEventListener('keydown', function(event) {
  var directions = {'37': 'left', '38': 'up', '39': 'right', '40': 'down'};
  if (directions[event.keyCode]) { 
    state.user.direction = directions[event.keyCode];
  }
});

update(state);
