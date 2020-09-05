
const displayValue = (element, data, toFixed = 0) => {
  if (typeof element == "object") {
    for (var i in element) {
      typeof data == "number"
        ? (element[i].innerHTML = game.notation
            .format(data, 2, toFixed)
            .toLowerCase())
        : (element[i].innerHTML = data);
    }
  } else {
    element.innerHTML = data;
  }
};
const editAttrabute = (element, attrabute, data) => {
  element[attrabute] = data;
};
const dge = {
  byClassName(ele) {
    return document.getElementsByClassName(ele);
  },
  byId(ele) {
    return document.getElementById(ele);
  },
};
const notify = () => {
  $.notify.addStyle("clean", {
    html: "<span data-notify-text/>",
    classes: {
      base: {
        "white-space": "nowrap",
        padding: "5px",
      },
      success: {
        color: "#1eff00",
      },
      error: {
        color: "red",
      },
      blackMatter: {
        color: "white",
        "text-shadow": "0px 0px 10px white",
      },
    },
  });
  $.notify.defaults({ style: "clean", globalPosition: "bottom center" });
};
notify();
const update = () => {
  let selectedNotation = document.getElementById("notationSelect").options[document.getElementById("notationSelect").selectedIndex].value;
  let lowerBound = 0;
  let upperBound = game.stars.length - 1;
  let sellSlider = dge.byId("sellSlider");
  let toDisplay = [
    ["starName", game.stars[game.currentStar].name],
    ["starMass", game.stars[game.currentStar].mass],
    ["starSize", game.stars[game.currentStar].getSize() * 100, 2],
    ["energy", game.energy, 0],
    ["money", game.money, 2],
    ["energyToMoney", game.energyToMoney],
    ["dysons", game.stars[game.currentStar].dysons],
    ["dysonCost", game.stars[game.currentStar].cost.dyson, 2],
    ["dysonPower", game.dyson.power],
    ["dysonEfficiency", game.dyson.efficiency],
    ["factories", game.stars[game.currentStar].factories],
    ["factoryPower", game.factory.power],
    ["factoryEfficiency", game.factory.efficiency],
    ["factoryCost", game.stars[game.currentStar].cost.factory, 2],
    [
      "dysonsPerSecond",
      game.stars[game.currentStar].factories * game.factory.power,
    ],
    [
      "energyDepletedPerSecond",
      ((game.stars[game.currentStar].factories * game.factory.power) /
        (game.factory.efficiency / 10)) *
        20,
    ],
    ["sellPercentage", sellSlider.value],
    ["sellEnergy", (sellSlider.value / 100) * game.energy],
    [
      "sellMoney",
      ((sellSlider.value / 100) * game.energy) / game.energyToMoney,
      2,
    ],
    ["blackMatter", game.blackMatter],
    ["upgradeDysonPower", game.upgrades.dysonPower.price(), 2],
    ["upgradeDysonEfficiency", game.upgrades.dysonEfficiency.price(), 2],
    ["upgradeFactoryPower", game.upgrades.factoryPower.price(), 2],
    ["upgradeFactoryEfficiency", game.upgrades.factoryEfficiency.price(), 2],
    ["blackMatterSellCashRatio", game.upgrades.sellCash.price(), 2],
    ["probes", game.probes],
    ["probeCost", game.probe.cost],
  ];
  for (let i in toDisplay) {
    !toDisplay[i][2]
      ? (toDisplay[i][2] = 0)
      : (toDisplay[i][2] = toDisplay[i][2]);
    displayValue(
      dge.byClassName(`^${toDisplay[i][0]}`),
      toDisplay[i][1],
      toDisplay[i][2]
    );
  }
  displayValue(
    dge.byClassName("title"),
    `Shrinking Star - ${game.energy} Energy`
  );
  editAttrabute(
    dge.byId("star"),
    "style",
    `transform:scale(${
      game.stars[game.currentStar].getSize()*game.stars[game.currentStar].multiplier.mass + 0.05
    });background:rgb(${game.stars[game.currentStar].getColor()[0]+25},${game.stars[game.currentStar].getColor()[1]},${game.stars[game.currentStar].getColor()[2]})`
  );
  game.currentStar == lowerBound
    ? (document.getElementById("leftArrow").style.color =  "transparent")
    : (document.getElementById("leftArrow").style.color = "white");
  game.currentStar == upperBound
    ? (document.getElementById("rightArrow").style.color = "transparent")
    : (document.getElementById("rightArrow").style.color =  "white");
  game.tick();
  game.selectNotation(selectedNotation);
};
