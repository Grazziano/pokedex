window.onload = () => {
  let name = document.getElementById('name');
  let level = document.getElementById('level');
  let attack = document.getElementById('attack');
  let defense = document.getElementById('defense');
  let btnSave = document.getElementById('save');
  let tbody = document.querySelector('tbody');

  if (sessionStorage.getItem('listPokemons') !== null) {
    tbody.innerHTML = sessionStorage.getItem('listPokemons');
  }

  function save() {
    let list = tbody.innerHTML;
    sessionStorage.setItem('listPokemons', list);
  }

  btnSave.addEventListener('click', (event) => {
    event.preventDefault();
    let newPokemon = [name.value, level.value, attack.value, defense.value];
    // console.log(`${name.value} - ${level.value} - ${attack.value} - ${defense.value}`);
    let tr = document.createElement('tr');
    for (const key in newPokemon) {
      let td = document.createElement('td');
      td.innerText = newPokemon[key];
      tr.append(td);
    }
    tbody.append(tr);
    save();
  });
}