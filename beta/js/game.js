const standard = new ADNotations.StandardNotation();
const scientific = new ADNotations.ScientificNotation();

//                                _|      _|              _|
//      _|      _|     _|_|       _|  _|       _|_|_|   _|
//     _|  _|     _|    _|     _|  _|     _|    _|   _|
//      _|         _|_|     _|      _|     _|_|_|   _|

//Thank you for playing!
//this is a BETA version

//Currency//
var game = {
  money: 0,
  ore: 0,
  //Pickaxes//
  pick:{
    names:[
      [
        ["Stick"],
        ["Wood Pickaxe"],
        ["Stone Pickaxe"],
        ["Iron Pickaxe"],
        ["Steel Pickaxe"],
        ["Diamond Pickaxe"],
      ],
      ["Shock Pickaxe"],
    ],
    level:1,
    power:1,
    cost:10,
    multiply:1,
    next:0
  },

  //Mines//
  mines: [
    [
      ["Copper Mine", 2000, 7, 5],
      ["Iron Mine", 100000, 15, 10],
      ["Steel Mine", 2000000, 30, 15],
      ["Diamond Mine", 3000000, 50, 20],
    ],
    [["Shock Mine", 1000000000, 100, 25]],
  ],
  sellPrice: 1,
  toughness: 1,
  nextMineNum: 0,
  mineCost: 400,

  //Vaults//
  vaults: [
    ["Stone Vault", 100, 400],
    ["Iron Vault", 1000, 800],
    ["Steel Vault", 10000, 1500],
    ["Gold Vault", 100000, 5000],
    ["Diamond Vault", 1000000, 15000],
    ["Shock Vault", 1000000000, 100000],
  ],
  vaultOverflow: 200,
  nextVaultNum: 0,
  vaultCost: 100,

  //Miners//
  miners: 0,
  minerPower: 1,
  minerCost: 20,
  ops: 0,

  //Energy//
  energy: 0,
  allBoost: 1,
  ticks: 1000,
  //Upgrades//
  area: 0,
  mineMultiply: 1,
  toughnessMultiply: 1,
  upgrades: [
    {
      name: "Power Pickaxe",
      discription: "Feel the Power! Pickaxe Power increased by 100%",
      cost: 1500,
      buffType: "pickaxe",
      buffAmount: 2,
      criteria: 1000,
      created: false,
    },
    {
      name: "Shiny Ores",
      discription: "The ore is now more shiny. Sell Price increased by 100%",
      cost: 25000,
      buffType: "mine",
      buffAmount: 2,
      criteria: 20000,
      created: false,
    },
    {
      name: "Stronger Picks",
      discription: "Give your Miners better Pickaxes. OPS increased by 100%",
      cost: 15000,
      buffType: "miners",
      buffAmount: 2,
      criteria: 10000,
      created: false,
    },
  ],
};
//Updating HTML
function formatCost(item, cost) {
  // Use a function to format number so we can easily change it later (or based on user setting)
  return item + "&#32; &#40;" + standard.format(cost, 2, 2) + "&#32;Coins&#41;";
}
function setNumberValue(id, n) {
  // Set the innerHTML of the element with id=id to the formatted value
  document.getElementById(id).innerHTML = standard.format(n, 2, 2);
}
function setCostValue(id, item, cost) {
  document.getElementById(id).innerHTML = formatCost(item, cost);
}
function disable(id) {
  document.getElementById(id).disabled = true;
}
function enable(id) {
  document.getElementById(id).disabled = false;
}
//Vault Stuff//
function overflow() {
  if (game.vaultOverflow < game.ore) {
    game.ore = game.vaultOverflow;
    updateView();
  }
}

//Mining Code//
function mine() {
  game.ore += game.pick.power / game.toughness;
  updateView();
  overflow();
}

//Selling Your Ore (since 2019)//
function sell() {
  game.money += game.sellPrice * game.ore;
  game.ore = 0;
  updateView();
}
// Buying stuff.
function buyNext(type) {
  switch (type) {
    case "pick":
      if (game.money >= game.pick.cost) {
        game.pick.power *= 1 + 0.1 * game.pick.multiply;
        game.pick.next = Math.trunc(game.pick.level / 25);
        game.money -= game.pick.cost;
        game.pick.cost *= 1.125;
        game.pick.level++;
        //if (nextPickNum == 6){nextPickNum...}
        updateView();
      }
      break;
    case "mine":
      if (game.money >= game.mines[game.area][game.nextMineNum][1]) {
        game.sellPrice =
          game.mines[game.area][game.nextMineNum][2] * game.mineMultiply;
        game.toughness =
          game.mines[game.area][game.nextMineNum][3] * game.toughnessMultiply;
        game.mineCost = game.mines[game.area][game.nextMineNum][1];
        game.money -= game.mineCost;
        game.ops = game.miners * game.minerPower;
        game.ops /= game.toughness * game.toughnessMultiply;
        game.nextMineNum++;
        updateView();
      }
      break;
    case "vault":
      if (game.money >= game.vaults[game.nextVaultNum][1]) {
        game.vaultOverflow = game.vaults[game.nextVaultNum][2];
        game.vaultCost = game.vaults[game.nextVaultNum][1];
        game.money -= game.vaultCost;
        game.nextVaultNum++;
        updateView();
      }
      break;
  }
}
function buyMiner() {
  if (game.money >= game.minerCost) {
    game.miners++;
    game.ops = game.miners * game.minerPower;
    game.ops /= game.toughness;
    game.money -= game.minerCost;
    game.minerCost *= 1.5;
    updateView();
  }
}

function handleInterval() {
  game.ore += game.ops;
  updateView();
  overflow();
}
let timer = setInterval(handleInterval, game.ticks);

function genEnergy() {
  game.energy++;
  updateView();
}

// UPGRADE SYSTEM
function buyUpgrade(id) {
  if (game.money >= game.upgrades[id].cost) {
    game.money -= game.upgrades[id].cost;
    switch (game.upgrades[id].buffType) {
      case "pickaxe":
        game.pick.multiply *= game.upgrades[id].buffAmount;
        game.pick.power *= game.pick.multiply;
        break;
      case "mine":
        game.mineMultiply *= game.upgrades[id].buffAmount;
        game.sellPrice *= game.mineMultiply;
        break;
      case "toughness":
        game.toughnessMultiply *= game.upgrades[id].buffAmount;
        game.toughness *= game.toughnessMultiply;
        break;
      case "miners":
        game.minerPower *= game.upgrades[id].buffAmount;
        game.ops *= game.minerPower;
        break;
    }
    let buttonElement = document.getElementsByClassName("upgradeButton")[0];
    buttonElement.parentNode.removeChild(buttonElement);
  }
}

function createUpgrade(id) {
  var newUpgrade = document.createElement("button");
  var buttonContent = document.createTextNode(
    game.upgrades[id].name +
      "\n" +
      game.upgrades[id].discription +
      "\n" +
      game.upgrades[id].cost +
      " Coins"
  );
  newUpgrade.className = "upgradeButton";
  newUpgrade.onclick = function () {
    buyUpgrade(id);
    return false;
  };
  newUpgrade.appendChild(buttonContent);
  document.getElementById("upgrademenu").appendChild(newUpgrade);
}
try {
  updateView();
}
catch(err) {
  console.error(err)
  
}
finally{
  window.localStorage.clear();
}
function save() {
  window.localStorage.clear();
  let save = JSON.stringify(game);
  window.localStorage.setItem("game", save);
  console.log("Game Saved!");
  $.notify("Game Saved", "success");
  updateView();
}
setInterval(save, 30000);

function load() {
  game = JSON.parse(localStorage.getItem("game"));
  updateView();
}
if (localStorage.getItem("game") !== null) {
  load();
  $.notify("Game Loaded", "info");
} else {
  $.notify("No Save Game Found", "warn");
}

function updateView() {
  setNumberValue("ore", game.ore);
  setNumberValue("toughness", game.toughness);
  setNumberValue("money", game.money);
  setNumberValue("pickpower", game.pick.power);
  setNumberValue("picklevel", game.pick.level);
  setNumberValue("overflow", game.vaultOverflow);
  setNumberValue("vaultpower", game.vaultOverflow);
  setNumberValue("minepower", game.sellPrice);
  setNumberValue("ops", game.ops);
  setNumberValue("energy", game.energy);
  setCostValue("minerbuy", "Miner", game.minerCost);
  setNumberValue("miners", game.miners);
  if (game.pick.next === 6) {
    disable("pickaxebuy");
  } else {
    setCostValue(
      "pickaxebuy",
      "Upgrade	&#32;" + game.pick.names[game.area][game.pick.next][0],
      game.pick.cost
    );

  }
  if (game.nextMineNum === 4) {
    disable("minebuy");
  } else{
    setCostValue(
      "minebuy",
      game.mines[game.area][game.nextMineNum][0],
      game.mines[game.area][game.nextMineNum][1]
    );

  }
  if (game.nextVaultNum === 5) {
    disable("vaultbuy");
    setCostValue(
      "vaultbuy",
      game.vaults[game.nextVaultNum][0],
      game.vaults[game.nextVaultNum][1]
    );
  }
  for (var i = 0; i < game.upgrades.length; i++) {
    if (
      game.money >= game.upgrades[i].criteria &&
      game.upgrades[i].created == false
    ) {
      createUpgrade(i);
      game.upgrades[i].created = true;
    }
    document.getElementById("vault").value = game.ore;
    document.getElementById("vault").max = game.vaultOverflow;
  }
}

