const standard = new ADNotations.StandardNotation();
const scientific = new ADNotations.ScientificNotation();


//                                _|      _|              _|
//      _|      _|     _|_|       _|  _|       _|_|_|   _|
//     _|  _|     _|    _|     _|  _|     _|    _|   _|
//      _|         _|_|     _|      _|     _|_|_|   _|

//Thank you for playing!
//This is a BETA Version. Very Unstable

//Currency//
var money = 0;
var ore = 0;


//Pickaxes//
var picks = [ [["Stick"],["Wood Pickaxe"],["Stone Pickaxe"], ["Iron Pickaxe"],["Steel Pickaxe"], ["Diamond Pickaxe"] ], ["Shock Pickaxe"] ];
var pickPower = 1;
var pickLevel = 1;
var nextPickNum = 0;
var pickCost = 10;

//Mines//
var mines = [["Copper Mine", 2000 , 7, 5],["Iron Mine", 100000 , 15, 10], ["Steel Mine", 2000000 , 30,15],["Diamond Mine", 3000000, 50, 20], ["Shock Mine", 1000000000, 100,25]];
var sellPrice = 1;
var toughness = 1;
var nextMineNum = 0;
var mineCost = 400;

//Vaults//
var vaults = [["Stone Vault", 100 , 400],["Iron Vault", 1000 , 800],["Steel Vault", 10000 , 1500], ["Gold Vault", 100000 , 5000],["Diamond Vault", 1000000, 15000],["Shock Vault",1000000000 , 100000]];
var vaultOverflow = 200;
var nextVaultNum = 0;
var vaultCost = 100;

//Miners//
var miners = 0;
var minerPower = 1;
var minerCost = 20;
var ops = 0;

//Mine upgrades!//
var area = 0;
var energyUnlocked = false;
//Upgrades//
var pickMultiply = 1;
var mineMultiply = 1;
var upgrades = [
  {
    "name":"Power Pickaxe",
    "discription":"Feel the Power! Pickaxe Power increased by 100%",
    "cost":1500,
    "buffType":"pickaxe",
    "buffAmount":2
  }
];
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
  setNumberValue("ore", ore);
  setNumberValue("toughness", toughness);
  setNumberValue("money", money);
  setNumberValue("pickpower", pickPower);
  setNumberValue("picklevel",pickLevel);
  setNumberValue("overflow", vaultOverflow);
  setNumberValue("vaultpower", vaultOverflow);
  setNumberValue("minepower", sellPrice);
  setNumberValue("ops", ops);
  setCostValue("pickaxebuy", "Upgrade	&#32;" + picks[area][nextPickNum][0], pickCost);
  setCostValue("minebuy", mines[nextMineNum][0], mines[nextMineNum][1]);
  setCostValue("vaultbuy", vaults[nextVaultNum][0], vaults[nextVaultNum][1]);
  setCostValue("minerbuy", "Miner", minerCost);
  setNumberValue("miners", miners);
  if (nextPickNum === 6){
    disable("pickaxebuy");
  }
  if (nextMineNum === 4){
    disable("minebuy");
  }
   if (nextVaultNum === 5){
    disable("vaultbuy");
  }
}
//Mining Code//
function mine() {
  ore += pickPower/toughness;
  updateView();
  overflow();
}
//Vault Stuff//
function overflow(){
  if (vaultOverflow < ore) {
    ore = vaultOverflow;
    updateView();
  }
}
//Selling Your Ore (since 2019)//
function sell(){
  money += sellPrice * ore;
  ore = 0;
  updateView();
}
//Buying new Pickaxes
function buyNextPick(){
  if (money >= pickCost){
    pickPower *= 1.1 * pickMultiply;
    nextPickNum = Math.trunc(pickLevel/25);
    money -= pickCost;
    pickCost *= 1.125;
    pickLevel++;
    //if (nextPickNum == 6){nextPickNum...}
    updateView();
  }
}
//Buying new Mines
function buyNextMine(){
  if (money >= mines[nextMineNum][1]){
    sellPrice = mines[nextMineNum][2];
    toughness = mines[nextMineNum][3];
    mineCost = mines[nextMineNum][1];
    money -= mineCost;
    ops = miners * minerPower;
    ops /= toughness;
    nextMineNum++;
    updateView();

  }
}
//Buying new Vaults
function buyNextVault(){
  if (money >= vaults[nextVaultNum][1]){
    vaultOverflow = vaults[nextVaultNum][2];
    vaultCost = vaults[nextVaultNum][1];
    money -= vaultCost;
    nextVaultNum++;
    updateView();
  }
}

function buyMiner(){
  if (money >=minerCost){
    miners++;
    ops = miners * minerPower;
    ops /= toughness;
    money -= minerCost;
    minerCost *= 1.5;
    updateView();
  }
}
var last = Date.now();
var goal = last + 1000;

function handleInterval () {
  last = Date.now();
  if (last >= goal) {
    goal = goal + 1000;
    ore += ops;
    updateView();
    overflow();
  }
}
setInterval(handleInterval, 1000);


// UPGRADE SYSTEM
function buyUpgrade(id) {
  if(money >= upgrades[id].cost){
    money -= upgrades[id].cost;
    switch(upgrades[id].buffType) {
      case 'pickaxe':
        pickMultiply *= upgrades[id].buffAmount;
      break;
   }
  let buttonElement = document.getElementsByClassName("upgradeButton")[0];
  buttonElement.parentNode.removeChild(buttonElement);
 }
}

function createUpgrade(id) {
  var newUpgrade = document.createElement("button");
  var buttonContent = document.createTextNode(upgrades[id].name + "\n" + upgrades[id].discription + "\n" + upgrades[id].cost + "Coins");
  newUpgrade.className = "upgradeButton";
  newUpgrade.onclick = function() {
  }
  newUpgrade.appendChild(buttonContent);
  document.getElementById("upgrademenu") .appendChild(newUpgrade);
}
