const ascensionCanvas = () => {
  const MMD = new FontFace(
    "MMD",
    'url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap")'
  );
  MMD.load().then((font) => {
    document.fonts.add(font);

    console.log("Font loaded");
  });
  const canvas = document.getElementById("ascensionCanvas");
  const ctx = canvas.getContext("2d");
  window.ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.95;

  let skills = [
    new SkillDot(
      "energyToMoney",
      "sell cash ratio",
      { x: 500, y: 125 },
      ["blackMatterGain"],
      (level) => Math.pow(2, level + 1),
      (level) => (game.energyToMoney = 100 - 5 * level),
      19
    ),
    new SkillDot(
      "blackMatterGain",
      "Black Matter Gain",
      { x: 600, y: 125 },
      [],
      (level) => Math.pow(2, level + 1),
      (level) => (game.energyToMoney = 100 - 5 * level),
      0
    ),
  ];

  let dragging = false;
  let zoom = 2;
  let position = [0, 0];
  let previousPosition = [0, 0];
  let dragPosition = [0, 0];
  let mouse = { x: 0, y: 0 };

  document.addEventListener("mousedown", (e) => {
    dragging = true;
    [previousPosition[0], previousPosition[1]] = position;
    dragPosition[0] = e.clientX;
    dragPosition[1] = e.clientY;
  });
  let hit = false;
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (dragging) {
      position[0] = previousPosition[0] - (dragPosition[0] - e.clientX);
      position[1] = previousPosition[1] - (dragPosition[1] - e.clientY);
    }
    for (const skill of skills) {
      if (
        mouse.x > skill.position.x - 25 + position[0] &&
        mouse.x < skill.position.x + 25 + position[0] &&
        mouse.y > skill.position.y + position[1] &&
        mouse.y < skill.position.y + 50 + position[1]
      ) {
        hit = skill;
        break;
      } else hit = false;
    }
    // for (const dot of skills) {
    //   console.log(JSON.stringify(mouse) + JSON.stringify(dot.position));
    //   let dx = mouse.x - dot.position.x;
    //   let dy = mouse.y - dot.position.y;
    //   if (dx * dx + dy * dy < 300) {
    //     hit = true;
    //   } else {
    //     hit = false;
    //   }
    // }
  });

  document.addEventListener("mouseup", (e) => {
    dragging = false;
  });
  const draw = () => {
    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(position[0], position[1]);
    ctx.scale(zoom, zoom);

    for (const skill of skills) {
      ctx.strokeStyle = "#ffffff";
      for (const to of skill.lines) {
        const toSkill = skills.find((skill) => skill.id == to);

        if (toSkill) {
          ctx.beginPath();
          ctx.moveTo(skill.position.x, skill.position.y);
          ctx.lineTo(toSkill.position.x, toSkill.position.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#a0a0a0";
      ctx.beginPath();
      ctx.arc(skill.position.x, skill.position.y, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
      //ctx.fillRect(skill.position.x - 16, skill.position.y - 16, 32, 32);
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(skill.position.x, skill.position.y, 25, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.fill();
    if (hit !== false) {
      ctx.fillRect(
        (mouse.x - (-8 + position[0])) / zoom,
        (mouse.y - (22 + position[1])) / zoom,
        128,
        64
      );
      ctx.strokeRect(
        (mouse.x - (-8 + position[0])) / zoom,
        (mouse.y - (22 + position[1])) / zoom,
        128,
        64
      );
      ctx.font = "16 MMD";
      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillText(
        hit.name,
        (mouse.x - (-8 + position[0])) / zoom,
        (mouse.y - position[1]) / zoom
      );
    }
  };
  draw();
};
