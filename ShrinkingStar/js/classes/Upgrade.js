class Upgrade {
  constructor(name, getPrice, getEffect) {
    //getPrice and getEffect are functions (e.g level => 1000*Math.pow(16,level))
    this.name = name;
    this.level = 0;
    this.getPrice = getPrice;
    this.getEffect = getEffect;
  }
  buy() {
    if (game.money >= this.getPrice(this.level)) {
      $.notify(`bought ${this.name.toLowerCase()} upgrade`, "success");
      game.money -= this.getPrice(this.level);
      this.level++;
      this.getEffect(this.level);
    }
  }
  price() {
    return this.getPrice(this.level);
  }
}
class BlackMatterUpgrade extends Upgrade {
  constructor(name, getPrice, getEffect) {
    super(name, getPrice, getEffect);
    this.level = 0;
  }
  buy() {
    if (game.blackMatter >= this.getPrice(this.level)) {
      $.notify(`bought ${this.name.toLowerCase()} upgrade`, "success");
      game.blackMatter -= this.getPrice(this.level);
      this.level++;
      this.getEffect(this.level);
    }
  }
  price() {
    return this.getPrice(this.level);
  }
}
