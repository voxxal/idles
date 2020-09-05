class Player {
  constructor() {
    let root = this;
    this.notation = new ADNotations.StandardNotation();
    this.energy = 0;
    this.money = 10;
    this.energyToMoney = 100;
    this.probes = 1;
    this.multipliers = {
      dysonPower() {
        return root.dyson.power;
      },
      massLoss(i) {
        return root.stars[i].dysons * root.multipliers.dysonPower();
      },
      energyLoss(i) {
        return (
          (root.stars[i].factories * root.factory.power) /
          (root.factory.efficiency / 1000)
        );
      },
      energyGain(i) {
        return (
          root.stars[i].dysons *
          root.dyson.power *
          root.stars[i].multipliers.energy
        );
      },
      dysonGain(i) {
        return (root.stars[i].factories * root.factory.power) / 20;
      },
      sellMoney(i) {
        return ((i / 100) * root.energy) / root.energyToMoney;
      },
      //ADD MORE
    };
    this.probe = {
      cost: 1e7,
    };
    this.upgrades = {
      dysonPower: new Upgrade(
        "Dyson Power",
        (level) => Math.pow(10, level + 2),
        (level) => (game.dyson.power = Math.pow(2, level))
      ),
      dysonEfficiency: new Upgrade(
        "Dyson Efficiency",
        (level) => Math.pow(10, level + 2),
        (level) => (game.dyson.efficiency = Math.pow(2, level))
      ),
      factoryPower: new Upgrade(
        "Factory Power",
        (level) => Math.pow(20, level + 2),
        (level) => (game.factory.power = Math.pow(2, level))
      ),
      factoryEfficiency: new Upgrade(
        "Factory Efficiency",
        (level) => Math.pow(20, level + 2),
        (level) => (game.factory.efficiency = Math.pow(2, level))
      ),
      sellCash: new BlackMatterUpgrade(
        "Sell Cash Ratio",
        (level) =>
          game.energyToMoney != 5 ? Math.pow(2, level + 1) : Infinity,
        (level) => (game.energyToMoney = 100 - 5 * level) // buy [UPGRADE] for X BLACK MATTER
      ),
    };
    this.blackMatterUpgrades = [];
    this.factory = {
      power: 1,
      efficiency: 1,
      cost: 1e3,
    };
    this.dyson = {
      power: 1,
      efficiency: 1,
      cost: 10,
    };
    this.blackMatter = 0;
    this.stars = [new Star("sun",1e6,1e6,{mass: 1, energy: 1},[1,1,0])];
    this.currentStar = 0;
  }
  getRandomLetter() {
    return [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "",
    ][this.getRandomInt(0, 25)];
  }
  getRandomDigit() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ""][this.getRandomInt(0, 9)];
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  buyUpgrade(upgrade) {
    this.upgrades[upgrade].buy();
  }
  buyProbe() {
    if (this.money >= this.probe.cost) {
      this.probes++;
      this.stars.push(
        new Star(
          this.randomName(),
          Math.log2(this.energy * 1e6) * this.stars[0].maxMass
        )
      );
      this.currentStar = this.stars.length - 1;
      this.stars.length == 2
        ? alert(
            "You've unlocked Multiple stars! use the arrows next to the star name in order to switch between stars, both will run at the same time, meaning that you can generate even more energy!"
          )
        : null;
      this.money -= this.probe.cost;
      this.probe.cost *= 10;
    }
  }
  randomName() {
    return `${this.getRandomLetter() + this.getRandomLetter()}-${
      this.getRandomDigit() + this.getRandomDigit()
    }`;
  }
  newStar(i) {
    let starTypes = {
      normal: new StarType(1, [1, 1, 0], { mass: 1, energy: 1 }),
      compact: new StarType(0.2, [0, 0, 1], { mass: 1, energy: 2 }),
      small: new StarType(0.3, [1, 0, 0], { mass: 0.5, energy: 1 }),
    };
    let newStarTypes = [];
    let name = this.randomName();
    this.blackMatter += Math.floor(Math.log10(this.stars[i].maxMass));
    for (let i in starTypes) {
      if (starTypes[i].chance > Math.random()) {
        newStarTypes.push(starTypes[i].data(i));
        console.log(newStarTypes);
      }
    }
    let newStarMult = {};
    let newStarAlpha = [0, 0, 0];
    for (let i in newStarTypes) {
      for (let k in newStarTypes[i].multiplier) {
        newStarMult[k]
          ? (newStarMult[k] *= newStarTypes[i].multiplier[k])
          : (newStarMult[k] = newStarTypes[i].multiplier[k]);
      }
      for (let k in newStarTypes[i].alpha) {
        newStarAlpha[k] += newStarTypes[i].alpha[k];
        
      }
      // add raysplaceinspace easter egg //OFLINE PROGRESS
    }
    $.notify(
      `gained ${this.notation.format(
        Math.floor(Math.log10(this.stars[i].maxMass))
      )} black matter`,
      "blackMatter"
    );
    $.notify(
      `lost ${this.notation.format(
        this.stars[i].dysons
      )} dysons and ${this.notation.format(this.stars[i].factories)} factories`
    );
    let starMass =
      Math.log2((this.energy + 10) * 1e6) *
      this.stars[i].maxMass *
      newStarMult.mass;

    //Math.log2(this.totalBlackMatter+2e4)*1e6
    this.stars[i] = new Star(name, starMass, starMass, newStarMult, newStarAlpha);
  }
  buyDyson(i) {
    if (game.money >= game.stars[i].cost.dyson) {
      this.stars[i].dysons++;
      game.money -= game.stars[i].cost.dyson;
      game.stars[i].cost.dyson *= 1.02;
      return true;
    }
    return false;
  }
  buyMaxDyson(i) {
    while (this.buyDyson(i));
  }
  buyMaxFactory(i) {
    while (this.buyFactory(i));
  }
  buyFactory(i) {
    if (game.money >= game.stars[i].cost.factory) {
      this.stars[i].factories++;
      game.money -= game.stars[i].cost.factory;
      game.stars[i].cost.factory *= 1.12;
      return true;
    }
    return false;
  }
  tick() {
    for (let i in this.stars) {
      this.stars[i].mass -= this.multipliers.massLoss(i);
      this.energy += this.stars[i].dysons * this.dyson.power;
      this.stars[i].mass <= 0 ? this.newStar(i) : null;
      if (this.energy > this.multipliers.energyLoss(i)) {
        this.energy -= this.multipliers.energyLoss(i);
        this.stars[i].dysons += this.multipliers.dysonGain(i);
      }
    }
    if (this.stars.length > this.probes) {
      this.stars.pop();
    }

    // this.star.name !== "sun" //remeber to hide black matter upgrades
    //   ? (dge.byId("blackMatter").style.display = "block")
    //   : (dge.byId("blackMatter").style.display = "none");
    // this.star.name !== "sun"
    //   ? (dge.byId("blackMatterUpgrades").style.display = "block")
    //   : (dge.byId("blackMatterUpgrades").style.display = "none");
  }
  sellEnergy(percentage) {
    $.notify(
      `sold ${this.notation
        .format((percentage / 100) * this.energy, 2, 2)
        .toLowerCase()} energy for $${this.notation
        .format(((percentage / 100) * this.energy) / this.energyToMoney, 2, 2)
        .toLowerCase()}`,
      "success"
    );
    this.money += this.multipliers.sellMoney(percentage);
    this.energy -= (percentage / 100) * this.energy;
  }
  save() {
    return {
      money: this.money,
      energy: this.energy,
      dysons: this.dysons,
      factories: this.factories,
      energyToMoney: this.energyToMoney,
      upgrades: {
        dysonPower: this.upgrades.dysonPower.level,
        dysonEfficiency: this.upgrades.dysonEfficiency.level,
        factoryPower: this.upgrades.factoryPower.level,
        factoryEfficiency: this.upgrades.factoryEfficiency.level,
        sellCash: this.upgrades.sellCash.level,
      },
      factory: {
        power: this.factory.power,
        efficiency: this.factory.efficiency,
        cost: this.factory.cost,
      },
      dyson: {
        power: this.dyson.power,
        efficiency: this.dyson.efficiency,
        cost: this.dyson.cost,
      },
      blackMatter: this.blackMatter,
      star: {
        name: this.star.name,
        mass: this.star.mass,
        maxMass: this.star.maxMass,
      },
    };
  }
  load(data) {
    this.money = data.money;
    this.energy = data.energy;
    this.dysons = data.dysons;
    this.factories = data.factories;
    this.energyToMoney = data.energyToMoney;
    for (let i in this.upgrades) {
      this.upgrades[i].level = data.upgrades[i];
    }
    this.factory = data.factory;
    this.dyson = data.dyson;
    this.blackMatter = data.blackMatter;
    this.star = new Star(data.star.name, data.star.mass, data.star.maxMass);
  }
  unfocus() {
    this.offTabTime = Date.now();
  }
  focus() {
    this.offlineTime = Date.now() - this.offTabTime;
    console.log(`was unfocused for ${this.offlineTime} ms`);
    for (let i; i <= this.offlineTime / 20; i++) {
      this.tick();
    }
  }
  changeStar(i) {
    let lowerBound = 0;
    let upperBound = game.stars.length - 1;
    (this.currentStar == lowerBound && i <= 0) ||
    (this.currentStar == upperBound && i >= 0)
      ? null
      : (this.currentStar += i);
    // this.currentStar == lowerBound
    //   ? (document.getElementById("leftArrow").style.display = "none")
    //   : (document.getElementById("leftArrow").style.display = "inline");
    // this.currentStar == upperBound
    //   ? (document.getElementById("rightArrow").style.display = "none")
    //   : (document.getElementById("rightArrow").style.display = "inline");
  }
  selectNotation(not = "Standard") {
    let notation;
    switch (not) {
      case "Standard":
        notation = new ADNotations.StandardNotation();
        break;
      case "Scientific":
        notation = new ADNotations.ScientificNotation();
        break;
      case "Engineering":
        notation = new ADNotations.EngineeringNotation();
        break;
      case "Letters":
        notation = new ADNotations.LettersNotation();
        break;
      case "Mixed Scientific":
        notation = new ADNotations.MixedScientificNotation();
        break;
      case "Mixed Engineering":
        notation = new ADNotations.MixedEngineeringNotation();
        break;
    }
    this.notation = notation;
    return notation;
  }
}
