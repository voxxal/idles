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
    if (game.pick.next === 6 && game.area === 0) {
      disable("pickaxebuy");
      setCostValue(
        "pickaxebuy",
        `Upgrade	&#32;  ${data.pick.names[game.area+1][0][0]}`,
        game.pick.cost
      );
    } else {
      setCostValue(
        "pickaxebuy",
        `Upgrade	&#32;  ${data.pick.names[game.area][game.pick.next][0]}`,
        game.pick.cost
      );
    }
    if (game.mines.next === 5 && game.area === 0) {
      disable("minebuy");
      setCostValue(
        "minebuy",
        data.mines[game.area+1][0].name,
        data.mines[game.area +1][0].cost
      );
    } else {
      setCostValue(
        "minebuy",
        data.mines[game.area][game.mines.next].name,
        data.mines[game.area][game.mines.next].cost
      );
    }
    if (game.vaults.next === 6 && game.area === 0) {
      disable("vaultbuy");
      setCostValue(
        "vaultbuy",
        data.vaults[game.area+1][0].name,
        data.vaults[game.area+1][0].cost
      );
    } else {
      setCostValue(
        "vaultbuy",
        data.vaults[game.area][game.vaults.next].name,
        data.vaults[game.area][game.vaults.next].cost
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
    //UPGRADE STUFF//
    for (var i = 0; i < data.upgrades.length; i++) {
      if (
        game.money >= data.upgrades[i].criteria &&
        data.upgrades[i].created == false
      ) {
        createUpgrade(i);
        data.upgrades[i].created = true;
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