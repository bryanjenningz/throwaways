var langData = [];

var collectUsers = (pages) => {
  var langs = () => { 
    var s = location.hash.match(/#learn=([^&]+)&speak=([^&]+)/).slice(1); 
    return 'knows: ' + s[1] + ', learning: ' + s[0]; 
  };

  for (var i = 0; i < pages || 20; i++) $('.more_nn').click();
  
  (() => {
    setTimeout(() => { 
      var data = langs() + ' --- ' + $('.nn').length;
      langData.push(data);
      langData.forEach((data) => { console.log(data); });
    }, 5000); 
  })();
};

collectUsers();
