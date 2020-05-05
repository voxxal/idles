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
//Updating HTML

//Vault Stuff//
function overflow() {
  if (game.vaults.capasity < game.ore) {
    game.ore = game.vaults.capasity;
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
      if (game.money >= data.mines[game.area][game.mines.next].cost) {
        sell();
        game.mines.sell =
        data.mines[game.area][game.mines.next].power *
          game.mines.multiply;
        game.mines.toughness =
        data.mines[game.area][game.mines.next].toughness *
          game.mines.toughMultiply;
        game.mineCost = data.mines[game.area][game.mines.next].cost;
        game.money -= game.mines.cost;
        game.ops = game.miners * game.minerPower;
        game.ops /= game.mines.toughness * game.mines.toughMultiply;
        game.mines.next++;
      }
      break;
    case "vault":
      if (game.money >= data.vaults[game.area][game.vaults.next].cost) {
        game.vaults.capasity = data.vaults[game.area][game.vaults.next].capasity;
        game.vaults.cost = data.vaults[game.area][game.vaults.next].cost;
        game.money -= game.vaults.cost;
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
  if (game.money >= data.upgrades[id].cost) {
    game.money -= data.upgrades[id].cost;
    switch (data.upgrades[id].buffType) {
      case "pick":
        game.pick.multiply *= data.upgrades[id].buffAmount;
        game.pick.power *= game.pick.multiply;
        break;
      case "mine":
        game.mines.multiply *= data.upgrades[id].buffAmount;
        game.mines.sell *= game.mines.multiply;
        break;
      case "toughness":
        game.mines.toughMultiply *= data.upgrades[id].buffAmount;
        game.mines.toughness *= game.mines.toughMultiply;
        break;
      case "miners":
        game.minerPower *= data.upgrades[id].buffAmount;
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
    `${data.upgrades[id].name}
      ${data.upgrades[id].discription}
     ${data.upgrades[id].cost}
      Coins`
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

