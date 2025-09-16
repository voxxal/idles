class Star {
  constructor(name, mass, maxMass = mass, multiplier = {}, alpha) {
    let root = this;
    this.name = name;
    this.mass = mass;
    this.maxMass = maxMass; //. do a.l.p.h.a
    this.dysons = 0;
    this.factories = 0;
    this.cost = {
      factory: 1e3,
      dyson: 10,
    };
    this.alpha = alpha;
    this.multiplier = multiplier;
  }
  getMass() {
    return this.mass;
  }
  getSize() {
    return this.mass / this.maxMass;
  }
  getName() {
    return this.name;
  }
  shrink(a) {
    this.mass -= a;
    return a;
  }
  getColor() {
    return [
      this.getSize() * this.alpha[0] * 255,
      this.getSize() * this.alpha[1] * 255,
      this.getSize() * this.alpha[2] * 255,
    ];
  }
}
