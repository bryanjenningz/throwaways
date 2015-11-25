var person = { x: 0, y: 0 };

function draw(xy) {
  return range(8).map((_, y) => {
    return range(8).map((_, x) => {
      return xy.x === x && xy.y === y ? 'x' : 'o';
    }).join('');
  }).join('\n');
}

function range(n) {
  return Array(n + 1).join(',').split('').map((_, i) => i);
}

addEventListener('keydown', function(e) {
  var left = (xy) => { xy.x--; };
  var right = (xy) => { xy.x++; };
  var up = (xy) => { xy.y--; };
  var down = (xy) => { xy.y++; };

  var keys = { '37': left, '39': right, '38': up, '40': down };
  if (keys[e.keyCode]) {
    keys[e.keyCode](person);
    console.clear();
    console.log(draw(person));
  }
});
