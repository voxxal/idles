class SkillDot {
  constructor(id, name, position, lines, getPrice, getEffect, maxLevel) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.lines = lines;
    this.getPrice = getPrice;
    this.getEffect = getEffect;
    this.maxLevel = maxLevel;
    this.level = 0;
  }
  buy(){
    if(this.level >= this.maxLevel){
        
    }
  }
  price(){
      return this.getPrice(this.level);
  }
}
