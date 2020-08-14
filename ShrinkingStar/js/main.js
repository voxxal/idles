let game = new Player();
if (localStorage.getItem("ShrinkingStarGame")) {
  game.load(JSON.parse(localStorage.getItem("ShrinkingStarGame")));
}
setInterval("update()", 50);
setInterval("save(game.save(),'ShrinkingStarGame')", 5000);
// window.addEventListener('blur', game.unfocus());
// window.addEventListener('focus', game.focus());