const standard = new ADNotations.StandardNotation();
const scientific = new ADNotations.ScientificNotation();


//                                _|      _|              _|
//      _|      _|     _|_|       _|  _|       _|_|_|   _|
//     _|  _|     _|    _|     _|  _|     _|    _|   _|
//      _|         _|_|     _|      _|     _|_|_|   _|

//Thank you for playing!


//Currency//
var game = {
"money" : 0,
 "ore" : 0,
//Pickaxes//
 "picks" : [ [["Stick"],["Wood Pickaxe"],["Stone Pickaxe"], ["Iron Pickaxe"],["Steel Pickaxe"], ["Diamond Pickaxe"] ], ["Shock Pickaxe"] ],
 "pickPower" : 1,
 "pickLevel" : 1,
 "nextPickNum" : 0,
 "pickCost" : 10,
//Mines//
  "mines" : [["Copper Mine", 2000 , 7, 5],["Iron Mine", 100000 , 15, 10], ["Steel Mine", 2000000 , 30,15],["Diamond Mine", 3000000, 50, 20], ["Shock Mine", 1000000000, 100,25]],
  "sellPrice" : 1,
  "toughness" : 1,
"nextMineNum" : 0,
 "mineCost" : 400,

//Vaults//
"vaults" : [["Stone Vault", 100 , 400],["Iron Vault", 1000 , 800],["Steel Vault", 10000 , 1500], ["Gold Vault", 100000 , 5000],["Diamond Vault", 1000000, 15000],["Shock Vault",1000000000 , 100000]],
"vaultOverflow" : 200,
"nextVaultNum" : 0,
"vaultCost" : 100,

//Miners//
"miners" : 0,
"minerPower" : 1,
"minerCost" : 20,
"ops" : 0,

//Upgrades//
"area" : 0,
"pickMultiply" : 1,
"mineMultiply" : 1,
"toughnessMultiply" : 1,
"upgrades" : [
  {
    "name":"Power Pickaxe",
    "discription":"Feel the Power! Pickaxe Power increased by 100%",
    "cost":1500,
    "buffType":"pickaxe",
    "buffAmount":2,
    "criteria":1000,
    "created":false
  },
  {
    "name":"Shiny Ores",
    "discription":"The ore is now more shiny. Sell Price increased by 100%",
    "cost":25000,
    "buffType":"mine",
    "buffAmount":2,
    "criteria":20000,
    "created":false
  },
  {
    "name":"Stronger Picks",
    "discription":"Give your Miners better Pickaxes. OPS increased by 100%",
    "cost":15000,
    "buffType":"miners",
    "buffAmount":2,
    "criteria":10000,
    "created":false
  }
]
};
//Updating HTML
function formatCost(item, cost){
  // Use a function to format number so we can easily change it later (or based on user setting)
  return item +	"&#32;" + "&#40;" + standard.format(cost,2,2) + "&#32;" + "Coins" + "&#41;";
}
function setNumberValue(id, n){
  // Set the innerHTML of the element with id=id to the formatted value
  document.getElementById(id).innerHTML = standard.format(n,2,2);
}
function setCostValue(id, item, cost){
  document.getElementById(id).innerHTML = formatCost(item, cost);
}
function disable(id){
  document.getElementById(id).disabled = true;
}

function updateView(){
  setNumberValue("ore", game.ore);
  setNumberValue("toughness", game.toughness);
  setNumberValue("money", game.money);
  setNumberValue("pickpower", game.pickPower);
  setNumberValue("picklevel",game.pickLevel);
  setNumberValue("overflow", game.vaultOverflow);
  setNumberValue("vaultpower", game.vaultOverflow);
  setNumberValue("minepower", game.sellPrice);
  setNumberValue("ops", game.ops);
  setCostValue("pickaxebuy", "Upgrade	&#32;" + game.picks[game.area][game.nextPickNum][0], game.pickCost);
  setCostValue("minebuy", game.mines[game.nextMineNum][0], game.mines[game.nextMineNum][1]);
  setCostValue("vaultbuy", game.vaults[game.nextVaultNum][0], game.vaults[game.nextVaultNum][1]);
  setCostValue("minerbuy", "Miner", game.minerCost);
  setNumberValue("miners", game.miners);
  if (game.nextPickNum === 6){
    disable("pickaxebuy");
  }
  if (game.nextMineNum === 4){
    disable("minebuy");
  }
   if (game.nextVaultNum === 5){
    disable("vaultbuy");
  }
  for (var i = 0; i < game.upgrades.length; i++) {
    if(game.money >= game.upgrades[i].criteria && game.upgrades[i].created == false){
      createUpgrade(i);
      game.upgrades[i].created = true;
    }
   document.getElementById("vault").value = game.ore;
   document.getElementById("vault").max = game.vaultOverflow;
  }
}
//Mining Code//
function mine() {
  game.ore += game.pickPower/game.toughness;
  updateView();
  overflow();
}
//Vault Stuff//
function overflow(){
  if (game.vaultOverflow < game.ore) {
    game.ore = game.vaultOverflow;
    updateView();
  }
}
//Selling Your Ore (since 2019)//
function sell(){
  game.money += game.sellPrice * game.ore;
  game.ore = 0;
  updateView();
}
//Buying new Pickaxes
function buyNextPick(){
  if (game.money >= game.pickCost){
    game.pickPower *= 1+(0.1 * game.pickMultiply);
    game.nextPickNum = Math.trunc(game.pickLevel/25);
    game.money -= game.pickCost;
    game.pickCost *= 1.125;
    game.pickLevel++;
    //if (nextPickNum == 6){nextPickNum...}
    updateView();
  }
}
//Buying new Mines
function buyNextMine(){
  if (game.money >= game.mines[game.nextMineNum][1]){
    game.sellPrice = game.mines[game.nextMineNum][2]*game.mineMupltiply;
    game.toughness = game.mines[game.nextMineNum][3]*game.toughnessMultiply;
    game.mineCost = game.mines[game.nextMineNum][1];
    game.money -= game.mineCost;
    game.ops = game.miners * game.minerPower;
    game.ops /= game.toughness*game.toughnessMultiply;
    game.nextMineNum++;
    updateView();

  }
}
//Buying new Vaults
function buyNextVault(){
  if (game.money >= game.vaults[game.nextVaultNum][1]){
    game.vaultOverflow = game.vaults[game.nextVaultNum][2];
    game.vaultCost = game.vaults[game.nextVaultNum][1];
    game.money -= game.vaultCost;
    game.nextVaultNum++;
    updateView();
  }
}

function buyMiner(){
  if (game.money >=game.minerCost){
    game.miners++;
   game.ops = game.miners * game.minerPower;
    game.ops /= game.toughness;
    game.money -= game.minerCost;
    game.minerCost *= 1.5;
    updateView();
  }
}
var last = Date.now();
var goal = last + 1000;

function handleInterval () {
  last = Date.now();
  if (last >= goal) {
    goal = goal + 1000;
    game.ore += game.ops;
    updateView();
    overflow();
  }
}
setInterval(handleInterval, 1000);


// UPGRADE SYSTEM
function buyUpgrade(id) {
  if(game.money >= game.upgrades[id].cost){
    game.money -= game.upgrades[id].cost;
    switch(game.upgrades[id].buffType) {
      case 'pickaxe':
        game.pickMultiply *= game.upgrades[id].buffAmount;
        game.pickPower *= game.pickMultiply;
      break;
     case 'mine':
        game.mineMultiply *= game.upgrades[id].buffAmount;
        game.sellPrice *= game.mineMultiply
      break;
     case 'toughness':
        game.toughnessMultiply *= game.upgrades[id].buffAmount;
        game.toughness *= game.toughnessMultiply
      break;
      case 'miners':
         game.minerPower *= game.upgrades[id].buffAmount;
         game.ops *= game.minerPower
       break;
   }
  let buttonElement = document.getElementsByClassName("upgradeButton")[0];
  buttonElement.parentNode.removeChild(buttonElement);
 }
}

function createUpgrade(id) {
  var newUpgrade = document.createElement("button");
  var buttonContent = document.createTextNode(game.upgrades[id].name + "\n" + game.upgrades[id].discription + "\n" + game.upgrades[id].cost + " Coins");
  newUpgrade.className = "upgradeButton";
  newUpgrade.onclick = function() {
    buyUpgrade(id);
    return false;
  }
  newUpgrade.appendChild(buttonContent);
  document.getElementById("upgrademenu") .appendChild(newUpgrade);
}
function save(){
  window.localStorage.clear();
var save = JSON.stringify(game);
window.localStorage.setItem("game", save);
console.log("Game Saved!")
updateView();
}
setInterval(save,30000);
function load(){
  game=JSON.parse(localStorage.getItem('game'));
  updateView();
}
if(localStorage.getItem('game') !== null){
load();
}
