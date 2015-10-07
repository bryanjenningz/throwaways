var collectUsers = (amount, interval) => {
  var expand = () => $('.more_nn').trigger($.Event('click'));
  var loggedInUsers = () => $('.nn');

  var setTimeouts = (func, amount, interval) => {
    amount = amount || 50;
    interval = interval || 150;
    for (var i = 0; i < amount; i++) {
      setTimeout(() => func(), interval * i);
    }
    setTimeout(() => console.log(loggedInUsers().length, 'users logged in.'), 
      (amount || 50) * (interval || 150));
  };

  setTimeouts(expand, amount, interval);
};

collectUsers();
