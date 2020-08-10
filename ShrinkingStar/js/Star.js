class Star {
  constructor(name, mass) {
    this.name = name;
    this.mass = mass;
    this.maxMass = mass;
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
