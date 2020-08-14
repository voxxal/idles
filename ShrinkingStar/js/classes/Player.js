class Player {
  constructor() {
    this.energy = 0;
    this.money = 10;
    this.dysons = 0;
    this.factories = 0;
    this.energyToMoney = 100;
    this.probes = 0;
    this.probe = {
      cost:1e7,
      speed:1,
    }
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
    this.blackMatterUpgrades = [

    ]
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
    this.star = new Star("sun", 1e6);
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
  newStar() {
    let name = `${this.getRandomLetter() + this.getRandomLetter()}-${
      this.getRandomDigit() + this.getRandomDigit()
    }`;
    this.blackMatter += Math.floor(Math.log10(this.star.maxMass));
    //Math.log2(this.totalBlackMatter+2e4)*1e6
    this.star = new Star(
      name,
      Math.log2(this.energy * 1e6) * this.star.maxMass
    );
    $.notify(`lost ${this.dysons} dysons and ${this.factories} factories`);
    this.dysons = 0;
    this.factories = 0;
    this.dyson.cost = 10;
    this.factory.cost = 1e3;
  }
  buyDyson() {
    if (game.money >= game.dyson.cost) {
      this.dysons++;
      game.money -= game.dyson.cost;
      game.dyson.cost *= 1.02; //FIX SCALING THIS SUCKS
      return true;
    }
    return false;
  }
  buyMaxDyson() {
    while (this.buyDyson());
  }
  buyMaxFactory() {
    while (this.buyFactory());
  }
  buyFactory() {
    if (game.money >= game.factory.cost) {
      this.factories++;
      game.money -= game.factory.cost;
      game.factory.cost *= 1.12;
      return true;
    }
    return false;
  }
  tick() {
    this.star.mass -= (this.dysons * this.dyson.power);
    this.energy += this.dysons * this.dyson.power*this.dyson.efficiency;
    this.star.mass <= 0 ? this.newStar() : null;
    //factory

    if (
      this.energy >
      (this.factories * this.factory.power) / (this.factory.efficiency / 2000)
    ) {
      this.energy -=
        (this.factories * this.factory.power) / (this.factory.efficiency / 10);
      this.dysons += (this.factories * this.factory.power) / 20;
    }
    this.star.name !== "sun" //remeber to hide black matter upgrades
      ? (dge.byId("blackMatter").style.display = "block")
      : (dge.byId("blackMatter").style.display = "none");
    this.star.name !== "sun"
      ? (dge.byId("blackMatterUpgrades").style.display = "block")
      : (dge.byId("blackMatterUpgrades").style.display = "none");
  }
  sellEnergy(percentage) {
    $.notify(
      `sold ${((percentage / 100) * this.energy).toFixed(2)} energy for $${(
        ((percentage / 100) * this.energy) /
        100
      ).toFixed(2)}`,
      "success"
    );
    this.money += ((percentage / 100) * this.energy) / this.energyToMoney;
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
  unfocus(){
    this.offTabTime = Date.now();
  }
  focus(){
    this.offlineTime = Date.now() - this.offTabTime;
    console.log(`was unfocused for ${this.offlineTime} ms`)
    for(let i; i <= (this.offlineTime/20);i++){
      this.tick();
    } 
  }
}
