class StarType {
  constructor(chance, alpha, multiplier = {}) {
    this.chance = chance;
    this.alpha = alpha;
    this.multiplier = {
      mass: multiplier.mass || 1,
      energy: multiplier.energy || 1,
    };
  }
  data() {
    return { alpha: this.alpha, multiplier: this.multiplier };
  }
}
