function formatCost(item, cost) {
  // Use a function to format number so we can easily change it later (or based on user setting)
  //return item + "&#32; &#40;" + standard.format(cost, 2, 2) + "&#32;Coins&#41;";
  return `${item}&#32; &#40; ${standard.format(cost, 2, 2)}&#32;Coins&#41;`;
}
function setNumberValue(id, n) {
  // Set the innerHTML of the element with id=id to the formatted value
  document.getElementById(id).innerHTML = standard.format(n, 2, 2);
}
function setCostValue(id, item, cost) {
  document.getElementById(id).innerHTML = formatCost(item, cost);
}
function disable(id) {
  document.getElementById(id).disabled = true;
}
function enable(id) {
  document.getElementById(id).disabled = false;
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}
function goTo(element) {
  var tabContents = document.getElementsByClassName("tabContent");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  document.getElementById(element).style.display = "block";
}
function displaySkill(type, id, cost) {}
function removeCreations() {
  for (const i in data.skills) {
    game.skills[i].created = false;
  }
  save();
}
