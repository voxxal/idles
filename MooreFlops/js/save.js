const save = (varible, slot) => {
  localStorage.removeItem(slot);
  localStorage.setItem(slot, JSON.stringify(varible));
};
const load = (slot) => {
  if (!localStorage.getItem(slot)) {
      return game;
  } else {
    return JSON.parse(localStorage.getItem(slot));
  }
};
