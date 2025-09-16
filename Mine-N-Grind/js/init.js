

if (CURRENT_VERSION_NUM.includes("beta")) {
  console.log(
    `%cMine-N-Grind\n%cBy: %cvoxal                    %cCurrent Version: %c${CURRENT_VERSION_NUM}`,
    "font-size:50px;",
    "",
    "color: yellow; font-style: italic;",
    "",
    "color: yellow; font-style: italic;"
  );
} else {
  console.log(
    `%cMine-N-Grind\n%cBy: %cvoxal                    %cCurrent Version: %c${CURRENT_VERSION_NUM}`,
    "font-size:50px;",
    "",
    "color: yellow; font-style: italic;",
    "",
    "color: green; font-style: italic;"
  );
}
console.log("███████ Initializing game ███████");

try {	
    console.log("🔍 Searching For Save")
    if (localStorage.getItem("game") !== null) {	
      load();	
      console.log("👀 Save Found!")
    } else {	
      console.log("❌ No Save found")	
    }	
  
  } catch (err) {	
    console.error(err);	
   // $.notify("Invalid Save File, Reloading", "error");	
  }
  
if (game.VERSION_NUM == CURRENT_VERSION_NUM ) {
  console.log(`✅ Up to date Game`);
} else {
  console.log(`❌ Outdated Game`);
  window.localStorage.clear();
}
