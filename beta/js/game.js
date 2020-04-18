"use strict";
const standard = new ADNotations.StandardNotation();
const scientific = new ADNotations.ScientificNotation();

//                                _|      _|              _|
//      _|      _|     _|_|       _|  _|       _|_|_|   _|
//     _|  _|     _|    _|     _|  _|     _|    _|   _|
//      _|         _|_|     _|      _|     _|_|_|   _|

//Thank you for playing!
//this is a BETA version

//Currency//
let game = {
  money: 0,
  ore: 0,
  autosave: setInterval(save, 30000),
  autosaveSetting: true,
  //Pickaxes//
  pick: {
    names: [
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
    level: 1,
    power: 1,
    cost: 10,
    multiply: 1,
    next: 0,
    energy: 0,
    decay: 5,
  },
  //Mines//
  mines: {
    data: [
      [
        {
          name: "Stone Mine",
          cost: 0,
          power: 1,
          toughness: 1,
          color: "#444444",
        },
        {
          name: "Copper Mine",
          cost: 2000,
          power: 7,
          toughness: 5,
          color: "#b87333",
        },
        {
          name: "Iron Mine",
          cost: 100000,
          power: 15,
          toughness: 10,
          color: "#cbcdcd",
        },
        {
          name: "Steel Mine",
          cost: 2000000,
          power: 15,
          toughness: 10,
          color: "#43464B",
        },
        {
          name: "Diamond Mine",
          cost: 3000000,
          power: 50,
          toughness: 20,
          color: "#b9f2ff",
        },
      ],
      [
        {
          name: "Shock Mine",
          cost: 1000000000,
          power: 100,
          toughness: 25,
        },
      ],
    ],
    sell: 1,
    toughness: 1,
    next: 1,
    cost: 400,
    multiply: 1,
    toughMultiply: 1,
  },

  //Vaults//
  vaults: {
    data: [
      [
        {
          name: "Stone Vault",
          cost: 0,
          capasity: 200,
        },
        {
          name: "Copper Vault",
          cost: 1000,
          capasity: 1000,
        },
        {
          name: "Iron Vault",
          cost: 10000,
          capasity: 4000,
        },
        {
          name: "Steel Vault",
          cost: 100000,
          capasity: 8000,
        },
        {
          name: "Steel Vault",
          cost: 100000,
          capasity: 16000,
        },
        {
          name: "Diamond Vault",
          cost: 1000000,
          capasity: 32000,
        },
      ],
      [
        {
          name: "Shock Vault",
          cost: 1000000000,
          capasity: 100000,
        },
      ],
    ],
    capasity: 200,
    next: 1,
    cost: 1000,
  },
  //Miners//
  miners: 0,
  minerPower: 1,
  minerCost: 20,
  ops: 0,

  //Energy//
  energy: 0,
  allBoost: 1,
  ticks: 1000,
  generators: {
    amount: 0,
    active: 0,
    power: 0,
    cost: 10000,
  },
  //Upgrades//
  area: 0,
  upgrades: [
    {
      name: "Power Pickaxe",
      discription: "Feel the Power! Pickaxe Power increased by 100%",
      cost: 1500,
      buffType: "pick",
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
function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}
function goTo(element) {
  var tabContents = document.getElementsByClassName("tabContent");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  document.getElementById(element).style.display = "block";
}
//Vault Stuff//
function overflow() {
  if (game.vault.capasity < game.ore) {
    game.ore = game.vault.capasity;
    updateView();
  }
}

//Mining Code//
function mine() {
  game.ore +=
    (game.pick.power * (1 + game.pick.energy * 0.5)) / game.mines.toughness;
  updateView();
  overflow();
}

//Selling Your Ore (since 2019)//
function sell() {
  game.money += game.mines.sell * game.ore;
  game.ore = 0;
  updateView();
}
// Buying stuff.
function buy(type) {
  switch (type) {
    case "pick":
      if (game.money >= game.pick.cost) {
        game.pick.power *= 1 + 0.1 * game.pick.multiply;
        game.pick.next = Math.trunc(game.pick.level / 25);
        game.money -= game.pick.cost;
        game.pick.cost *= 1.125;
        game.pick.level++;
        //if (nextPickNum == 6){nextPickNum...}
      }
      break;
    case "mine":
      if (game.money >= game.mines.data[game.area][game.mines.next].cost) {
        game.mines.sell =
          game.mines.data[game.area][game.mines.next].power *
          game.mines.multiply;
        game.mines.toughness =
          game.mines.data[game.area][game.mines.next].toughness *
          game.mines.toughMultiply;
        game.mineCost = game.mines.data[game.area][game.mines.next].cost;
        game.money -= game.mines.cost;
        game.ops = game.miners * game.minerPower;
        game.ops /= game.mines.toughness * game.mines.toughMultiply;
        game.mines.next++;
      }
      break;
    case "vault":
      if (game.money >= game.vaults.data[game.vaults.next].cost) {
        game.vaults.capasity = game.vaults.data[game.vaults.next].capasity;
        game.vault.cost = game.vaults.data[game.vault.next].cost;
        game.money -= game.vault.cost;
        game.vaults.next++;
      }
      break;
    case "miner":
      if (game.money >= game.minerCost) {
        game.miners++;
        game.ops = game.miners * game.minerPower;
        game.ops /= game.mines.toughness;
        game.money -= game.minerCost;
        game.minerCost *= 1.25;
      }
      break;
    case "generator":
      if (game.money >= game.generators.cost) {
        game.generators.amount++;
        game.money -= game.generators.cost;
        game.generators.cost *= 1.5;
      }
      break;
  }
  updateView();
}

function loop() {
  game.ore += game.ops;
  updateView();
  overflow();
  if (game.ore - game.generators.active >= 0) {
    game.ore -= game.generators.active;
    game.energy += game.generators.active;
  }
  //Energy Decay
  if (game.pick.energy > 0) {
    game.pick.energy -= game.pick.decay;
  }
}
let timer = setInterval(loop, game.ticks);

function genEnergy() {
  game.energy++;
  updateView();
}

// UPGRADE SYSTEM
function buyUpgrade(id) {
  if (game.money >= game.upgrades[id].cost) {
    game.money -= game.upgrades[id].cost;
    switch (game.upgrades[id].buffType) {
      case "pick":
        game.pick.multiply *= game.upgrades[id].buffAmount;
        game.pick.power *= game.pick.multiply;
        break;
      case "mine":
        game.mines.multiply *= game.upgrades[id].buffAmount;
        game.mines.sell *= game.mines.multiply;
        break;
      case "toughness":
        game.mines.toughMultiply *= game.upgrades[id].buffAmount;
        game.mines.toughness *= game.mines.toughMultiply;
        break;
      case "miners":
        game.minerPower *= game.upgrades[id].buffAmount;
        game.ops *= game.minerPower;
        break;
    }
    let buttonElement = document.getElementsByClassName("upgradeButton")[id];
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
function activateGenerator() {
  if (game.generators.amount > game.generators.active) {
    game.generators.active++;
    updateView();
  }
}
function deactivateGenerator() {
  if (game.generators.active > 0) {
    game.generators.active--;
    updateView();
  }
}
function boost(type) {
  switch (type) {
    case "pick":
      if (game.energy > 100) {
        game.pick.energy += 100;
        game.energy -= 100;
      }
      break;
  }
  updateView();
}
try {
  if (localStorage.getItem("game") !== null) {
    load();
    $.notify("Game Loaded", "info");
  } else {
    $.notify("No Save Game Found", "warn");
  }
  updateView();
} catch (err) {
  window.localStorage.clear();
  console.error("Invalid Save File");
  $.notify("Invalid Save File, Reloading", "error");
  setTimeout(function () {
    location.reload();
  }, 200231230);
}
function save() {
  window.localStorage.clear();
  let save = JSON.stringify(game);
  window.localStorage.setItem("game", save);
  console.log("Game Saved!");
  $.notify("Game Saved", "success");
  updateView();
}
if ((game.autosaveSetting = false)) {
  document.getElementById("autosave").innerHTML = "Turn On Autosave";
  clearInterval(game.autosave);
}

function autosaveToggle() {
  if (game.autosaveSetting == true) {
    clearInterval(game.autosave);
    game.autosaveSetting = false;
    document.getElementById("autosave").innerHTML = "Turn On Autosave";
    save();
  } else if (game.autosaveSetting == false) {
    game.autosave = setInterval(save, 30000);
    game.autosaveSetting = true;
    document.getElementById("autosave").innerHTML = "Turn Off Autosave";
  }
}
function load() {
  game = JSON.parse(localStorage.getItem("game"));
  updateView();
}
function exportGame() {
  var exportedSave = btoa(JSON.stringify(game));
  prompt("This is your save, keep it safe", exportedSave);
}
function importGame() {
  var importedSave = prompt("Please Enter Save. THIS WILL OVERRIDE SAVE!", "");
  if (JSON.parse(atob(importedSave)) != undefined) {
    game = JSON.parse(atob(importedSave));
    updateView();
    save();
  } else {
    $.notify("Save invalid", "error");
  }
}

function updateView() {
  setNumberValue("ore", game.ore);
  setNumberValue("toughness", game.mines.toughness);
  setNumberValue("money", game.money);
  setNumberValue(
    "pickpower",
    (game.pick.power * (1 + game.pick.energy * 0.5)) / game.mines.toughness
  );
  setNumberValue("picklevel", game.pick.level);
  setNumberValue("overflow", game.vaults.capasity);
  setNumberValue("vaultpower", game.vaults.capasity);
  setNumberValue("minepower", game.mines.sell);
  setNumberValue("ops", game.ops);
  setNumberValue("energy", game.energy);
  setNumberValue("miners", game.miners);
  setNumberValue("generators", game.generators.amount);
  setNumberValue("activeGenerators", game.generators.active);
  setNumberValue("generatorsOutOf", game.generators.amount);
  setNumberValue("pickEnergy", game.pick.energy);
  if (game.pick.next === 6) {
    disable("pickaxebuy");
  } else {
    setCostValue(
      "pickaxebuy",
      "Upgrade	&#32;" + game.pick.names[game.area][game.pick.next][0],
      game.pick.cost
    );
  }
  if (game.mines.next === 4) {
    disable("minebuy");
  } else {
    setCostValue(
      "minebuy",
      game.mines.data[game.area][game.mines.next].name,
      game.mines.data[game.area][game.mines.next].cost
    );
  }
  if (game.nextVaultNum === 5) {
    disable("vaultbuy");
  } else {
    setCostValue(
      "vaultbuy",
      game.vaults.data[game.area][game.vaults.next].name,
      game.vaults.data[game.area][game.vaults.next].cost
    );
  }
  document.getElementById("vault").value = game.ore;
  document.getElementById("vault").max = game.vaults.capasity;
  setCostValue("minerbuy", "Miner", game.minerCost);
  setCostValue("generatorBuy", "Generator", game.generators.cost);
  if (game.pick.energy > 60) {
    disable("boostPick");
  } else {
    enable("boostPick");
  }
  //UPGRADE STUFF//
  for (var i = 0; i < game.upgrades.length; i++) {
    if (
      game.money >= game.upgrades[i].criteria &&
      game.upgrades[i].created == false
    ) {
      createUpgrade(i);
      game.upgrades[i].created = true;
    }
  }
  var css =
    "progress[value]::-webkit-progress-value {background:" +
    game.mines.data[game.area][game.mines.next - 1].color +
    ";}";
  var style = document.createElement("style");

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName("head")[0].appendChild(style);
}
