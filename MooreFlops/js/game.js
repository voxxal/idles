let defaultGame = {
  stats: {
    time: 0,
    totalMoney: 100,
  },
  operations: 0,
  clickOperations: 1,
  money: 100,
  ICboards: {
    cost: 20,
    ammount: 0,
  },
  jobListings: [],
  chips: [],
  quantumBoards: {},
  currentTransistor: "10mm",
  unlockedTransistors: ["10mm"],
  transistors: {
    "10mm": 0,
    "6mm": 0,
    "3mm": 0,
    "1.5mm": 0,
    "1mm": 0,
    "800nm": 0,
    "600nm": 0,
    "350nm": 0,
    "250nm": 0,
    "180nm": 0,
    "130nm": 0,
    "90nm": 0,
    "65nm": 0,
    "45nm": 0,
    "32nm": 0,
    "22nm": 0,
    "14nm": 0,
    "10nm": 0,
    "7nm": 0,
    "5nm": 0,
    "3nm": 0,
    "1nm": 0,
  },
};
game = defaultGame;
game = load("game");
// let game = {
//     stats: {
//       time: loadedGame.stats.time || 0,
//     },
//     operations: loadedGame.operations || 0,
//     clickOperations: loadedGame.clickOperations ||1,
//     money: loadedGame.money || 100,
//     transistors: {
//       "10mm": loadedGame.transistors["10mm"] || 0,
//       "6mm": loadedGame.transistor["6mm"] || 0,
//       "3mm":loadedGame.transistors["3mm"] ||  0,
//       "1.5mm":loadedGame.transistors["6mm"] ||  0,
//       "1mm": loadedGame.transistors["1mm"] || 0,
//       "800nm":loadedGame.transistors["800nm"] ||  0,
//       "600nm":loadedGame.transistors["600nm"] ||  0,
//       "350nm":loadedGame.transistors["350nm"] ||  0,
//       "250nm":loadedGame.transistors["250nm"] ||  0,
//       "180nm":loadedGame.transistors["180nm"] ||  0,
//       "130nm": loadedGame.transistors["130nm"] || 0,
//       "90nm":loadedGame.transistors["90nm"] ||  0,
//       "65nm":loadedGame.transistors["65nm"] ||  0,
//       "45nm": loadedGame.transistors["45nm"] || 0,
//       "32nm": loadedGame.transistors["32nm"] || 0,
//       "22nm": loadedGame.transistors["22nm"] || 0,
//       "14nm": loadedGame.transistors["14nm"] || 0,
//       "10nm":loadedGame.transistors["10nm"] ||  0,
//       "7nm": loadedGame.transistors["7nm"] || 0,
//       "5nm": loadedGame.transistors["5nm"] || 0,
//       "3nm": loadedGame.transistors["3nm"] || 0,
//       "1nm": loadedGame.transistors["1nm"] || 0,
//     },
//   };
const notation = (num) => {};
setInterval(() => {
  game.stats.time++;
}, 1000);
const computeClick = () => {
  game.operations += game.clickOperations;
  game.stats.totalOperations += game.clickOperations;
};
const flop = () => {
  for (let i in game.transistors) {
    game.operations += (game.transistors[i] * transistors[i].generation) / 40;
  }
};
const buyTransistor = (type) => {
  let cost = transistors[type].cost;
  if (game.money >= cost) {
    game.money -= cost;
    game.transistors[type]++;
  }
};
const resetGame = () => {
  let option = confirm("ARE YOU SURE YOU WANT TO RESET YOUR GAME");
  if (option) {
    game = defaultGame;
  }
};
const listTransistors = () => {
  for (let i in game.transistors) {
    let container = document.createElement("div");
    container.id = `${i}Container`;
    container.innerHTML = `${transistors[i].name} transistor:`;
    let ammount = document.createElement("span");
    ammount.id = `${i}Ammount`;
    ammount.innerHTML = `${game.transistors[i]}`;
    let buttons = document.createElement("div");
    buttons.className = "right";
    buttons.id = `${i}Buttons`;
    let plusButton = document.createElement("div");
    plusButton.innerHTML = "+";
    plusButton.className = "button buildingButtons";
    let minusButton = document.createElement("div");
    minusButton.innerHTML = "-";
    minusButton.className = "button buildingButtons";
    container.appendChild(ammount);
    buttons.appendChild(minusButton);
    buttons.appendChild(plusButton);
    container.appendChild(buttons);
    document.getElementById("transistorList").appendChild(container);
  }
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const updateListTransistors = () => {
  for (let i in game.transistors) {
    let ammount = document.getElementById(`${i}Ammount`);
    ammount.innerHTML = `${game.transistors[i]}`;
  }
};
const newJob = () => {
  let name = jobNames[Math.floor(Math.random() * jobNames.length)];
  let slope = getRandomInt(80, 120);
  let operations = game.operations * getRandomInt(2, 15);
  let money = (operations / slope);
  let job = new Job(name, operations, money);
  job.createElement()
  // console.log(job)
  // game.jobListings.push(job);
};
