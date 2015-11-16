(function() {
  var values = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 
                '10', 'j', 'q', 'k'];
  var suits = ['clubs', 'hearts', 'spades', 'diamonds'];
  var screen = document.getElementById('game');
  var context = screen.getContext('2d');

  var makeDeck = function() {
    var cards = [];

    suits.forEach(function(suit) {
      values.forEach(function(value) {
        cards.push({value: value, suit: suit, faceDown: false});
      });
    });

    return cards;
  };

  var drawCard = (function() {
    var image = document.getElementById('cardsImage');
    var backImage = document.getElementById('cardBackImage');

    var srcWidth = 73;
    var srcHeight = 99;
    var scalar = 0.4;
    var cardWidth = srcWidth * scalar;
    var cardHeight = srcHeight * scalar;

    return function(context, card) {
      if (!card.faceDown) {
        var srcX = values.indexOf(String(card.value)) * srcWidth;
        var srcY = suits.indexOf(String(card.suit)) * srcHeight;
        context.drawImage(image, srcX, srcY, srcWidth, srcHeight, 
          card.pile.x, card.pile.y + 10 * card.pile.cards.indexOf(card), cardWidth, cardHeight);
      } else {
        context.drawImage(backImage, 50, 50, 400, 600,
          card.pile.x, card.pile.y + 10 * card.pile.cards.indexOf(card), cardWidth, cardHeight);
      }
    };
  })();

  var drawPile = function(context, pile) {
    pile.cards.forEach(function(card) {
      drawCard(context, card);
    });
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

  var makePiles = (function() {
    var pileCoordinates = [
      {x: 0, y: 0},
      {x: 100, y: 0},
      {x: 200, y: 0},
      {x: 300, y: 0},
      {x: 400, y: 0},
      {x: 500, y: 0},

      {x: 0, y: 200},
      {x: 100, y: 200},
      {x: 200, y: 200},
      {x: 300, y: 200},
      {x: 400, y: 200},
      {x: 500, y: 200},
      {x: 600, y: 200}
    ];

    return function() {
      var piles = [];
      pileCoordinates.forEach(function(coordinates) {
        piles.push(Object.assign({cards: []}, coordinates));
      });
      return piles;
    };
  })();

  var assignPiles = function(cards, piles) {
    for (var i = 0; i < 7; i++) {
      for (var j = i; j < 7; j++) {
        var card = cards[i * 7 + j];
        if (i === j) {
          card.faceDown = false;
        } else {
          card.faceDown = true;
        }
        card.pile = piles[6 + j];
        piles[6 + j].cards.push(card);
      }
    }
  };

  var startGame = function(context) {
    cards = shuffle(makeDeck());
    piles = makePiles();
    assignPiles(cards, piles);

    piles.forEach(function(pile) {
      drawPile(context, pile);
    });
  };

  $(screen).height($(window).height() - 10);
  // drawCard(context, {suit: 'hearts', value: 'k', 'faceDown': false});
  
  startGame(context);
})();
