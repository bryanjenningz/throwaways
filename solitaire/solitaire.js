(function() {
  var values = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 
                '10', 'j', 'q', 'k'];
  var suits = ['clubs', 'hearts', 'spades', 'diamonds'];
  var screen = document.getElementById('game');
  var context = screen.getContext('2d');

  var makeDeck = function() {
    var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
    var values = ['a', '2', '3', '4', '5', '6', '7', '8', '9', 
                  '10', 'j', 'q', 'k'];
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
    var scalar = .4;
    var cardWidth = srcWidth * scalar;
    var cardHeight = srcHeight * scalar;

    return function(context, card) {
      if (!card.faceDown) {
        var srcX = values.indexOf(String(card.value)) * srcWidth;
        var srcY = suits.indexOf(String(card.suit)) * srcHeight;
        context.drawImage(image, srcX, srcY, srcWidth, srcHeight, 
                                 0, 0, cardWidth, cardHeight);
      } else {
        context.drawImage(backImage, 50, 50, 400, 600,
                                     0, 0, cardWidth, cardHeight);
      }
    };
  })();

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

  $(screen).height($(window).height() - 10);
  drawCard(context, {suit: 'hearts', value: 'k', 'faceDown': false});

})();
