function save(){
  window.localStorage.clear();
var save = JSON.stringify(game);
window.localStorage.setItem("game", save);
console.log("Game Saved!");
$.notify("Game Saved", "success");
updateView();
}
setInterval(save,30000);
function load(){
  game=JSON.parse(localStorage.getItem('game'));
  updateView();
}
if(localStorage.getItem('game') !== null){
load();
$.notify("Game Loaded", "info");
}else{
 $.notify("No Save Game Found", "warn");
}
