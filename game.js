const standard = new ADNotations.StandardNotation();
const scientific = new ADNotations.ScientificNotation();

//Currency
var money = 0;
var ore = 0;


//Pickaxes
var picks = [["Wood Pickaxe", 20 , 2],["Stone Pickaxe", 100 , 3],["Iron Pickaxe", 500 , 5], ["Steel Pickaxe", 1000 , 10],["Gold Pickaxe", 1500, 20], ["Diamond Pickaxe", 2500, 40], ["Infinity Pickaxe", 999999999999999999999999999999999999999999999999999999999999999999, 1000]]
var pickPower = 1;
var nextPickNum = 0;
var pickCost = 20;

//Mines
var mines = [["Coal Mine", 400 , 2],["Iron Mine", 2000 , 3],["Steel Mine", 10000 , 5], ["Gold Mine", 20000 , 10],["Diamond Mine", 30000, 25], ["Infinity Mine", 999999999999999999999999999999999999999999999999999999999999999999, 1000]]
var sellPrice = 1;
var nextMineNum = 0;
var mineCost = 400;

//Vaults
var vaults = [["Stone Vault", 100 , 400],["Iron Vault", 1000 , 800],["Steel Vault", 10000 , 1500], ["Gold Vault", 100000 , 5000],["Diamond Vault", 1000000, 15000] ["Infinity Vault", 999999999999999999999999999999999999999999999999999999999999999999, 1000]]
var vaultOverflow = 200;
var nextVaultNum = 0;
var vaultCost = 100;

//Miners
var drillCost = 60;
var latchCost = 120;
var minerCost = 20;
var ops = 0;

//Mining Code
function mine() {
  ore += pickPower;
  updateView()
  overflow();
}
function overflow(){
  if (vaultOverflow <= ore) {
    ore = vaultOverflow;
    updateView()
  }
}
//Selling Your Ore
function sell(){
  money += sellPrice * ore;
  ore = 0;
  updateView()
}
//Updating HTML
function formatCost(item, cost){
  // Use a function to format number so we can easily change it later (or based on user setting)
  return item +	"&#32;" + "&#40;" + standard.format(cost) + "&#32;" + "Coins" + "&#41;";
}
function setNumberValue(id, n){
  // Set the innerHTML of the element with id=id to the formatted value
  document.getElementById(id).innerHTML = standard.format(n);
}
function setCostValue(id, item, cost){
  document.getElementById(id).innerHTML = formatCost(item, cost);
}
function updateView(){
  setNumberValue("ore", ore);
  setNumberValue("money", money);
  setNumberValue("pickpower", pickPower);
  setNumberValue("overflow", vaultOverflow);
  setNumberValue("vaultpower", vaultOverflow);
  setNumberValue("minepower", sellPrice);
  setNumberValue("ops", ops);
  setCostValue("pickaxebuy", picks[nextPickNum][0], picks[nextPickNum][1]);
  setCostValue("minebuy", mines[nextMineNum][0], mines[nextMineNum][1]);
  setCostValue("vaultbuy", vaults[nextVaultNum][0], vaults[nextVaultNum][1]);
  setCostValue("minerbuy", "Miner", minerCost);
  setCostValue("drillbuy", "Drill", drillCost);
  setCostValue("latchbuy", "Latch", latchCost);
  //updateView();
}
//setInterval(updateView, 100);
//Buying new Pickaxes
function buyNextPick(){
  if (money >= picks[nextPickNum][1]){
    pickPower = picks[nextPickNum][2];
    pickCost = picks[nextPickNum][1];
    money -= pickCost;
    nextPickNum++;
    updateView();
    console.log(nextPickNum);
  }
}
//Buying new Mines
function buyNextMine(){
  if (money >= mines[nextMineNum][1]){
    sellPrice = mines[nextMineNum][2];
    mineCost = mines[nextMineNum][1];
    money -= mineCost;
    nextMineNum++;
    updateView();
    console.log(nextMineNum);
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
    console.log(nextVaultNum);
  }
}

function buyMiner(){
if (money >=minerCost){
  ops++;
  money -= minerCost;
  minerCost *= 1.5;
  updateView();
}
}
function buyDrill(){
if (money >=drillCost){
  ops += 5
  money -= drillCost;
  drillCost *= 1.5;
  updateView();
}
}
function buyLatch(){
if (money >= latchCost){
  ops += 10
  money -= latchCost;
  latchCost *= 1.5;
  updateView();
}
}
var last = Date.now()
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
