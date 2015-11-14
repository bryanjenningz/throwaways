(function() {
  var makeDeck = function() {
    var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    var values = ['2', '3', '4', '5', '6', '7', '8', '9', 
                  '10', 'jack', 'queen', 'king', 'ace'];
    var cards = [];

    suits.forEach(function(suit) {
      values.forEach(function(value) {
        cards.push({value: value, suit: suit, up: true, pile: 0, fromBotton: null});
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
    }
  };

  var cardView = {
    init: function() {
      this.element = document.querySelector('#game');
      this.template = document.querySelector('#cardTemplate').textContent;
    },
    render: function(card) {
      console.log(this.template);
      this.element.textContent = this.template.replace(/{{([^\}]+)}}/g, function(entire, found) {
        return card[found];
      });
    }
  };

  var gameView = {
    init: function() {
      this.element = document.querySelector('#game');
      this.template = document.querySelector('#gameTemplate').textContent;
    },
    render: function(cards) {
      cards.forEach(function(card, i, deck) {
        cardView.render(card);
      });
    }
  };

  var controller = {
    init: function() {
      model.init();
      cardView.init();
      cardView.render(model.cards);
    },
    render: function() {
      cardView.render(model.cards);
    }
  };

  controller.init();
})();
