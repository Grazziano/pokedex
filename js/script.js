window.onload = () => {
  let name = document.getElementById('name');
  let level = document.getElementById('level');
  let attack = document.getElementById('attack');
  let defense = document.getElementById('defense');
  let btnSave = document.getElementById('save');
  let tbody = document.querySelector('tbody');
  let line = document.getElementsByClassName('line');

  if (sessionStorage.getItem('listPokemons') !== null) {
    tbody.innerHTML = sessionStorage.getItem('listPokemons');
  }

  function save() {
    let list = tbody.innerHTML;
    sessionStorage.setItem('listPokemons', list);
  }

  function validate() {
    let err = [];
    if (level.value > 0 && level.value <= 50) {
      level.value = Number(level.value);
    } else {
      err.push('O level deve ser entre 1 e 50');
    }
    if (attack.value > 0 && attack.value <= 345) {
      attack.value = Number(attack.value);
    } else {
      err.push('O ataque deve ser entre 1 e 345');
    }
    if (defense.value > 0 && defense.value <= 400) {
      defense.value = Number(defense.value);
    } else {
      err.push('A defesa deve ser entre 1 e 400');
    }
    return err;
  }

  function clearInputs() {
    name.value = '';
    level.value = '';
    attack.value = '';
    defense.value = '';
  }

  btnSave.addEventListener('click', (event) => {
    let checkValues = validate();
    if (checkValues.length === 0) {
      event.preventDefault();
      let newPokemon = [name.value, level.value, attack.value, defense.value];
      let tr = document.createElement('tr');
      tr.classList.add('line');
      for (const key in newPokemon) {
        let td = document.createElement('td');
        td.innerText = newPokemon[key];
        tr.append(td);
      }
      tbody.append(tr);
      save();
      clearInputs();
    } else {
      let divErrors = document.createElement('div');
      divErrors.classList.add('errors');
      tbody.append(divErrors);
      checkValues.forEach(element => {
        let span = document.createElement('span');
        span.classList.add('tag', 'is-danger');
        span.innerText = element;
        divErrors.appendChild(span);
        let br = document.createElement('br');
        divErrors.appendChild(br);

        setTimeout(function clearErrors() {
          $('.errors').fadeOut('slow');
        }, 3000);

      });

    }
  });

  for (let index = 0; index < line.length; index += 1) {
    line[index].addEventListener('click', (event) => {
      let value = prompt('Digite novo valor:');
      event.target.innerText = value;
      save();
    });
  }
}