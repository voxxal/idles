function updateView() {
    setNumberValue("ore", game.ore);
    setNumberValue("toughness", game.mines.toughness);
    setNumberValue("money", game.money);
    setNumberValue(
      "pickpower",
      (game.pick.power * (1 + game.pick.energy * 0.5)) / game.mines.toughness
    );
    setNumberValue("picklevel", game.pick.level);
    setNumberValue("overflow", game.vaults.capasity);
    setNumberValue("vaultpower", game.vaults.capasity);
    setNumberValue("minepower", game.mines.sell);
    setNumberValue("ops", game.ops);
    setNumberValue("energy", game.energy);
    setNumberValue("miners", game.miners);
    setNumberValue("generators", game.generators.amount);
    setNumberValue("activeGenerators", game.generators.active);
    setNumberValue("generatorsOutOf", game.generators.amount);
    setNumberValue("pickEnergy", game.pick.energy);
    if(game.area >= 1){
      document.getElementById("EnergyTab").style.display = "inline"
    }
    if (data.pick.names[game.area][game.pick.next] == undefined){
      disable("pickaxebuy");
      setCostValue(
        "pickaxebuy",
        `Upgrade	&#32;  ${data.pick.names[game.area+1][0]}`,
        game.pick.cost
      );
    } else {
      enable("minebuy")
      setCostValue(
        
        "pickaxebuy",
        `Upgrade	&#32;  ${data.pick.names[game.area][game.pick.next][0]}`,
        game.pick.cost
      );
    }
    if (data.mines[game.area][game.mines.next] == undefined){
      disable("minebuy");
      setCostValue(
        "minebuy",
        data.mines[game.area+1][0].name,
        data.mines[game.area+1][0].cost
      );
    } else {
      enable("minebuy")
      setCostValue(
        "minebuy",
        data.mines[game.area][game.mines.next].name,
        data.mines[game.area][game.mines.next].cost
      );
    }

    if (data.vaults[game.area][game.vaults.next] == undefined){
      disable("vaultbuy");
      setCostValue(
        "vaultbuy",
        data.vaults[game.area+1][0].name,
        data.vaults[game.area+1][0].cost
      );
    } else {
      enable("minebuy")
      setCostValue(
        "vaultbuy",
        data.vaults[game.area][game.mines.next].name,
        data.vaults[game.area][game.mines.next].cost
      );
    }
    document.getElementById("vault").value = game.ore;
    document.getElementById("vault").max = game.vaults.capasity;
    setCostValue("minerbuy", "Miner", game.minerCost);
    setCostValue("generatorBuy", "Generator", game.generators.cost);
    if (game.pick.energy > 60) {
      disable("boostPick");
    } else {
      enable("boostPick");
    }
    for(const i in data.skills){
      if(game.area >= data.skills[i].area && data.skills[i].created == false){
        createSkill(i);
      }
    }
    //UPGRADE STUFF//
    for (const i in game.upgrades) {
      if (
        game.money >= game.upgrades[0][i].criteria &&
        game.upgrades[0][i].created == false
      ) {
        createUpgrade(i);
        game.upgrades[0][i].created = true;
      }
    }
    var css =
      `progress[value]::-webkit-progress-value {background: 
      ${data.mines[game.area][game.mines.next - 1].color} 
      ;}`;
    var style = document.createElement("style");
  
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  
    document.getElementsByTagName("head")[0].appendChild(style);
  }
