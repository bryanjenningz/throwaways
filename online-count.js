var onlineCount = () => {
  for (var i = 0; i < 20; i++) $('.btn.btn-labeled.btn-block').click();
  return new Promise((resolve) => {
    setTimeout(() => resolve($('.online-status.online').length), 3000);
  });
};
onlineCount().then((count) => console.log(count + ' users online...'));
