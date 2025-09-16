


const calcuateTime = () => {
  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  let time = {
    days: Math.floor(game.stats.time / 86400),
    hours: pad(Math.floor(game.stats.time / 3600)),
    minutes: pad(Math.floor(game.stats.time / 60)),
    seconds: pad(game.stats.time % 60),
  };
  return `${time.days}:${time.hours}:${time.minutes}:${time.seconds}`;
};
const saveGame = () => {
  save(game, "game");
};

const update = () => {
  displayValue(elements.show.operations, game.operations);
  displayValue(elements.show.money, game.money);
  displayValue(elements.show.timePlayed, calcuateTime());
  displayValue(elements.show.totalMoney,game.stats.totalMoney);
  displayValue(elements.show.totalOperations,game.stats.totalOperations);
  displayValue(elements.show.transistorType, transistors[game.currentTransistor].name);
  displayValue(elements.show.transistorCost, transistors[game.currentTransistor].cost);
  displayValue(elements.show.ICboardCost, game.ICboards.cost);
  saveGame();
  updateListTransistors()

  flop(); //FIX to give it every second instead of every 25 ticks
};
window.setInterval("update()", 25);
window.setTimeout("listTransistors()",100)
