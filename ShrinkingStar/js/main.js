let game = load("game") || new Player();
setInterval("update()",50);
setInterval("save(game,'ShrinkingStarGame')",5000);