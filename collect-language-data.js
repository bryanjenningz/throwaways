// This program is used to collect language learning data.
// Once I have enough data, I'll create a visualization so 
// it will be easy to see language learning trends.

var collectLanguageData = function() {
  var languages = [
    'english', 'chinese', 'french', 'spanish', 'portuguese', 'german',
    'japanese', 'korean', 'arabic', 'hindi', 'italian', 'russian'
  ];

  var time = new Date();
  var data = {time: time, languages: {}};

  // data's structure:
  // data: {
  //   time: date,
  //   languages: [
  //     english: {
  //       native: {
  //         m: { ... languages ... },
  //         f: { ... languages ... }
  //       },
  //       learning: {
  //         m: { ... languages ... },
  //         f: { ... languages ... }
  //       }
  //     },
  //     ... 
  //   ]
  // }

  var initCounts = function(values) {
    var result = {};
    values.forEach(function(value) {
      result[value] = 0;
    });
    return result;
  };

  var initData = function() {
    languages.forEach(function(language) {
      data.languages[language] = {};
      data.languages[language].native = {
        m: initCounts(languages), f: initCounts(languages)
      };
      data.languages[language].learning = {
        m: initCounts(languages), f: initCounts(languages)
      };
    });
  };

  var addLanguageData = function() {
    var info = location.hash.match(/#learn=([^&]+)&speak=([^&]+)&gender=(\d)/);
    var learningLanguage = info[1];
    var nativeLanguage = info[2];
    var gender = {'1': 'f', '2': 'm'}[info[3]];
    var people = $('.nn').length;

    data[nativeLanguage].learning[learningLanguage][gender] = people;
    data[learningLanguage].native[nativeLanguage][gender] = people;
  };
  
  for (var i = 0; i < 25; i++) {
    $('.more_nn').click();
  }

  setTimeout(addLanguageData, 5000);
};
