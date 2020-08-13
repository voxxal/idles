class Star {
  constructor(name, mass, maxMass = mass) {
    this.name = name;
    this.mass = mass;
    this.maxMass = maxMass;
  }
  getMass() {
    return this.mass;
  }
  getSize() {
    return (this.mass / this.maxMass);
  }
  getName() {
    return this.name;
  }
  shrink(a) {
    this.mass -= a;
    return a;
  }
}
