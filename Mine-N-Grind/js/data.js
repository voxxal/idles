const CURRENT_VERSION_NUM = "v1.4beta";

let game = {
  VERSION_NUM: CURRENT_VERSION_NUM,
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
  upgrades:[],
  skills:[]
};
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
      [
        ["Shock Pickaxe"],
        ["Spark Pickaxe"],
        ["Volta Pickaxe"],
        ["Electron Pickaxe"],
        ["Lightning Pickaxe"],
      ],
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
        cost: 2e5,
        power: 7,
        toughness: 5,
        color: "#b87333",
      },
      {
        name: "Iron Mine",
        cost: 1e6,
        power: 15,
        toughness: 10,
        color: "#cbcdcd",
      },
      {
        name: "Steel Mine",
        cost: 2e7,
        power: 15,
        toughness: 10,
        color: "#43464B",
      },
      {
        name: "Diamond Mine",
        cost: 3e8,
        power: 50,
        toughness: 20,
        color: "#b9f2ff",
      },
    ],
    [
      {
        name: "Diamond Mine",
        cost: 3e8,
        power: 50,
        toughness: 20,
        color: "#b9f2ff",
      },
      {
        name: "Shock Mine",
        cost: 1e9,
        power: 100,
        toughness: 25,
        color: "#9dff00",
      },
      {
        name: "Spark Mine",
        cost: 5e10,
        power: 200,
        toughness: 75,
        color: "#00ffff",
      },
      {
        name: "Volta Mine",
        cost: 5e12,
        power: 500,
        toughness: 150,
        color: "#007575",
      },
      {
        name: "Electron Mine",
        cost: 1e13,
        power: 750,
        toughness: 250,
        color: "#007575",
      },
      {
        name: "Lightning Mine",
        cost: 3e15,
        power: 1500,
        toughness: 450,
        color: "#FDD023",
      },
    ],
  ],
  vaults: [
    [
      {
        name: "Stone Vault",
        cost: 0,
        capasity: 200,
      },
      {
        name: "Copper Vault",
        cost: 1e3,
        capasity: 1000,
      },
      {
        name: "Iron Vault",
        cost: 1e4,
        capasity: 4000,
      },
      {
        name: "Steel Vault",
        cost: 1e5,
        capasity: 8000,
      },
      {
        name: "Diamond Vault",
        cost: 1e6,
        capasity: 32000,
      },
    ],
    [
      {
        name: "Diamond Vault",
        cost: 1e6,
        capasity: 32000,
      },
      {
        name: "Shock Vault",
        cost: 1e9,
        capasity: 1e5,
      },
      {
        name: "Spark Vault",
        cost: 1e10,
        capasity: 2e5,
      },
      {
        name: "Volta Vault",
        cost: 1e11,
        capasity: 4e5,
      },
      {
        name: "Volta Vault",
        cost: 1e12,
        capasity: 8e5,
      },
      {
        name: "Electron Vault",
        cost: 1e13,
        capasity: 1.6e6,
      },
      {
        name: "Lightning Vault",
        cost: 1e14,
        capasity: 3.2e6,
      },
    ],
  ],
  upgrades: [
    {
      name: "Power Pickaxe",
      id: 0,
      discription: "Feel the Power! Pickaxe Power increased by 100%",
      cost: 1500,
      buffType: "pick",
      buffAmount: 2,
      criteria: 1000,
      created: false,
      bought:false,
    },
    {
      name: "Shiny Ores",
      id: 1,
      discription: "The ore is now more shiny. Sell Price increased by 100%",
      cost: 25000,
      buffType: "mine",
      buffAmount: 2,
      criteria: 20000,
      created: false,
      bought:false,
    },
    {
      name: "Stronger Picks",
      id: 2,
      discription: "Give your Miners better Pickaxes. OPS increased by 100%",
      cost: 15000,
      buffType: "miners",
      buffAmount: 2,
      criteria: 10000,
      created: false,
      bought:false,
    },
    {
      name: "Energy",
      id: 3,
      discription: "Discover ENERGY",
      cost: 1.5e9,
      buffType: "area",
      buffAmount: 2e8,
      criteria: 1e9,
      created: false,
      bought:false,
    },
  ],
  skills:[
    {
      name:"Rock Smash",
      id:0,
      cooldown:60,
      area:0,
      created:false,
      boost:{
        type:"damage",
        amount:100,
      },
      cost:{
        type:"none",
        amount:0
      }
    },
    {
      name:"Energy Blast",
      id:1,
      cooldown:120,
      area:1,
      created:false,
      boost:{
        type:"damage",
        amount:100*game.energy,
      },
      cost:{
        type:"energy",
        amount:50
      }
    }
  ]
};

function save() {
  window.localStorage.clear();
  let save = JSON.stringify(game);
  window.localStorage.setItem("game", save);
  console.log("✔ Game Saved!");
  $.notify("Game Saved", "success");
  updateView();
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
  console.log("🔃 Loaded Game")
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