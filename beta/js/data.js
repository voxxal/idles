const data = {
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
},
    mines: [
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
    vaults:[
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
  
let game = {
  money: 0,
  ore: 0,
  autosave: setInterval(save, 30000),
  autosaveSetting: true,
  //Pickaxes//
  pick: {
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
    sell: 1,
    toughness: 1,
    next: 1,
    cost: 400,
    multiply: 1,
    toughMultiply: 1,
  },

  //Vaults//
  vaults: {
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
};

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

