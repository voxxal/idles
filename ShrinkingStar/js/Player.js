class Player {
  constructor() {
    this.energy = 0;
    this.money = 10;
    this.dysons = 0;
    this.dyson = {
      power: 1,
      efficiency: 1,
      cost: 10,
    };
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
  newStar() {
    let name = `${this.getRandomLetter() + this.getRandomLetter()}-${
      this.getRandomDigit() + this.getRandomDigit()
    }`;

    this.star = new Star(name, 1e6);
  }
  buyDyson() {
    if (game.money >= game.dyson.cost) {
      this.dysons++;
      game.money -= game.dyson.cost;
    }
  }
  tick() {
    this.star.mass -= (this.dysons * this.dyson.power) / this.dyson.efficiency;
    this.energy += this.dysons * this.dyson.power;
    this.star.mass <= 0 ? this.newStar() : null;
  }
  sellEnergy(percentage) {
    this.money += ((percentage / 100) * this.energy) / 100;
    this.energy -= (percentage / 100) * this.energy;
  }
}
