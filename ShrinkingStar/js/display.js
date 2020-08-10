const standard = new ADNotations.StandardNotation();
console.log(standard);
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
const update = () => {
  displayValue(dge.byClassName("^starName"), game.star.name);
  displayValue(dge.byClassName("^energy"), game.energy);
  displayValue(dge.byClassName("^money"), game.money);
  displayValue(dge.byClassName("^starMass"), game.star.mass);
  displayValue(dge.byClassName("^starSize"), game.star.getSize() * 100);
  displayValue(dge.byClassName("^dysons"), game.dysons);
  displayValue(dge.byClassName("^dysonCost"),game.dyson.cost)
  displayValue(
    dge.byClassName("^sellPercentage"),
    dge.byId("sellSlider").value
  );
  displayValue(
    dge.byClassName("^sellEnergy"),
    ((dge.byId("sellSlider").value / 100) * game.energy).toFixed(0)
  );
  displayValue(
    dge.byClassName("^sellMoney"),
    ((dge.byId("sellSlider").value / 100) * game.energy) / 100
  );
  editAttrabute(
    dge.byId("star"),
    "style",
    `transform:scale(${game.star.getSize()});background:rgb(255,${
      game.star.getSize() * 255
    },0)`
  );
  game.tick();
};
