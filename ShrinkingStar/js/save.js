const save = (varible, slot) => {
  localStorage.removeItem(slot);
  localStorage.setItem(slot, JSON.stringify(varible));
};
const load = (slot) => {  //FIX THIS!!!!!!!!!!!!!
  try {
    return JSON.parse(localStorage.getItem(slot));
  } catch {
    console.log("Parse Error: No Save");
  }
};
