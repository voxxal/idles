class Job {
  constructor(name, operations, money) {
    this.name = name;
    this.operations = operations;
    this.money = money;
    this.id;
  }
  createElement() {
    let container = document.createElement("div");
    container.id = `${this.name + this.operations + this.money}`;
    let title = document.createElement("h1");
    title.innerHTML = `${this.name}`
    container.innerHTML = `${this.operations}`
    let use = document.createElement("div");
    use.innerHTML= `complete for ${this.money}`
    use.className = "button"
    use.addEventListener('onclick', this.buy, false);

    this.id = container.id;
    container.appendChild(title)
    container.appendChild(use);
    document.getElementById("jobListings").appendChild(container)
  }
  buy(){
      if(game.operations >= this.operations){
          game.money+= this.money;
          let removedItem = document.getElementById(this.id);
        //   removedItem.parentNode.removeChild(removedItem);
          return false;
      }
  }
}
const jobNames = [
  "AnotherGameCompany inc.",
  "nitch.io",
  "bithub.com",
  "the9thdimension Corp.",
  "UGN industries",
  "Paperclips R Universal LLC.",
  "ShibeClicker Games",
  "Ordinal Markdown Inc.",
  "The Clickers of Cookies",
  "$Captalist Inc.",
  "logistics.inc",
  "A Lit Room Games",
  "Grinder Of Realms",
  "Heroes Of Clickers Inc.",
  "synergism power.",
  "trimpsrule games.",
  "UniSoft"
];
