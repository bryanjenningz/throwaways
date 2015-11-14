(function() {
  var makeDeck = function() {
    var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', 
                  '10', 'jack', 'queen', 'king', 'ace'];
    var cards = [];

    suits.forEach(function(suit) {
      values.forEach(function(value) {
        cards.push({value: value, suit: suit});
      });
    });

    return cards;
  };

  var shuffle = function(cards) {
    var swap = function(array, i, j) {
      var oldI = array[i];
      array[i] = array[j];
      array[j] = oldI;
    };

    // [lo, hi)
    var randInt = function(lo, hi) {
      return Math.floor(Math.random() * (hi - lo)) + lo;
    };

    cards.forEach(function(card, i, deck) {
      swap(deck, i, randInt(i, deck.length));
    });

    return cards;
  };

  var model = {
    init: function() {
      this.cards = shuffle(makeDeck());
    },
    newGame: function() {
      this.cards = shuffle(this.cards);
    }
  };

  var view = {
    init: function() {
      this.template = document.querySelector('#cardTemplate').innerHtml;
    },
    render: function(card) {
      this.template.replace(/{{([^\}]+)}})/g, function(entire, found) {
        console.log(entire);
        console.log(found);
        return card[found];
      });
    }
  };

  var controller = {
    init: function() {
      model.init();
      view.render(model.cards);
    },
    render: function() {
      view.render(model.cards);
    }
  };

  controller.init();
})();
