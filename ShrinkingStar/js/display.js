const standard = new ADNotations.StandardNotation();
const displayValue = (element, data) => {
  if (typeof element == "object") {
    for (var i in element) {
      typeof data == "number"
        ? (element[i].innerHTML = standard.format(data, 2, 2).toLowerCase())
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
  let sellSlider = dge.byId("sellSlider");
  let toDisplay = [
    ["starName", game.star.name],
    ["starMass", game.star.mass],
    ["starSize", game.star.getSize() * 100],
    ["energy", game.energy],
    ["money", game.money],
    ["energyToMoney",game.energyToMoney],
    ["dysons", game.dysons],
    ["dysonCost", game.dyson.cost],
    ["dysonPower", game.dyson.power],
    ["dysonEfficiency", game.dyson.efficiency],
    ["factories", game.factories],
    ["factoryPower", game.factory.power],
    ["factoryEfficiency", game.factory.efficiency],
    ["factoryCost", game.factory.cost],
    ["dysonsPerSecond", game.factories * game.factory.power],
    [
      "energyDepletedPerSecond",
      ((game.factories * game.factory.power) / (game.factory.efficiency / 10)) *
        20,
    ],
    ["sellPercentage", sellSlider.value],
    ["sellEnergy", (sellSlider.value / 100) * game.energy],
    [
      "sellMoney",
      ((sellSlider.value / 100) * game.energy) / game.energyToMoney,
    ],
    ["blackMatter", game.blackMatter],
    ["upgradeDysonPower", game.upgrades.dysonPower.price()],
    ["upgradeDysonEfficiency", game.upgrades.dysonEfficiency.price()],
    ["upgradeFactoryPower", game.upgrades.factoryPower.price()],
    ["upgradeFactoryEfficiency", game.upgrades.factoryEfficiency.price()],
    ["blackMatterSellCashRatio", game.upgrades.sellCash.price()],
  ];
  for (let i in toDisplay) {
    displayValue(dge.byClassName(`^${toDisplay[i][0]}`), toDisplay[i][1]);
  }
  displayValue(
    dge.byClassName("title"),
    `Shrinking Star - ${game.energy} Energy`
  );
  editAttrabute(
    dge.byId("star"),
    "style",
    `transform:scale(${game.star.getSize() + 0.05});background:rgb(255,${
      game.star.getSize() * 255
    },0)`
  );
  game.tick();
};
