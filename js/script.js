let appData = {
  pokemon: 'kadabra'
  
}

const inputSearch = document.querySelector('.searchPokemon');
const modifPokemon = document.querySelector('.modifier');

modifPokemon.addEventListener('click', function() {
  appData.pokemon = inputSearch.value;
  console.log(appData.pokemon);
  imagePokemon(appData.pokemon);
  fetchName(appData.pokemon);
  type(appData.pokemon);
  imagePokemon(appData.pokemon);
  taillePoids(appData.pokemon);
  categorie(appData.pokemon);
  capacity(appData.pokemon);
  description(appData.pokemon);
  gender(appData.pokemon);
  stats(appData.pokemon);
    });




function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {
  
  fetchName();
  type();
  imagePokemon();
  taillePoids();
  categorie();
  capacity();
  description();
  gender();
  stats();
  // evolution(pokemon);

  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}kg`;
}


async function fetchName() {

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data = await response.json();
  const h1 = document.querySelector('h1');
  h1.textContent = data.name;
  const span = document.createElement('span');
  span.textContent = '#' + data.game_indices[0].game_index;
  h1.appendChild(span);
}

async function type (){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data  = await response.json();

  for (const iterator of data.types) {
      const li = document.createElement('li');
      const btn1 = document.createElement('button');
      btn1.classList.add(iterator.type.name);
      btn1.textContent = iterator.type.name;
      const typeList = document.querySelector('.type-list');
      typeList.appendChild(li);
      li.appendChild(btn1);

      faiblesse(iterator.type.name);
    }
}

async function imagePokemon (){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data  = await response.json();
  const imagePokemon = document.querySelector('.w-100');
  imagePokemon.src = data.sprites.other["official-artwork"].front_default;
  const imagePokemonShiny = document.querySelector('.shiny');
  imagePokemonShiny.src = data.sprites.other["official-artwork"].front_shiny;
  console.log(imagePokemon);
}

async function taillePoids(){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data  = await response.json();
  const taillePokemon = document.querySelector('.taille');
  taillePokemon.textContent = data.height + '"';
  const poidsPokemon = document.querySelector('#specifications-weight');
  poidsPokemon.textContent = Math.round(poundsToKg(data.weight)) +'Kg';
  // poidsPokemon.textContent = data.weight + 'KG';
}

async function categorie(){
  const response  = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + appData.pokemon);
  const data = await response.json();
  const categoriePokemon = document.querySelector('.categorie');
  categoriePokemon.textContent = data.genera[3].genus;
}

async function capacity(){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data  = await response.json();
  for (const iterator of data.abilities) {
    const capacite = document.createElement('strong');
    capacite.textContent = iterator.ability.name;
    const capaciteContain = document.querySelector('.capacite');
    capaciteContain.appendChild(capacite);
  }
}

async function description(){
  const response  = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + appData.pokemon);
  const data  = await response.json();
  const descriptionPokemon = document.querySelector('.description');
  console.log(descriptionPokemon);
  descriptionPokemon.textContent = data.flavor_text_entries[40].flavor_text;
}

async function gender(){
  const response  = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + appData.pokemon);
  const data  = await response.json();
  const valeurGender = data.gender_rate;
  console.log(valeurGender);
  console.log(data);


  if (valeurGender < 0){
    document.querySelector('.bi-gender-female').style.display = 'none';
    document.querySelector('.bi-gender-male').style.display = 'none';
  } 
  else if (valeurGender == 0) {
    document.querySelector('.bi-gender-female').style.display = 'none';
    document.querySelector('.bi-gender-male').style.display = 'inline';

  } 
  else if (valeurGender == 8) {
    document.querySelector('.bi-gender-male').style.display = 'none';
    document.querySelector('.bi-gender-female').style.display = 'inline';
    // console.log(valeurGender);
  } 
  else if (valeurGender > 0 && valeurGender < 8 ){
    document.querySelector('.bi-gender-male').style.display = 'inline';
    document.querySelector('.bi-gender-female').style.display = 'inline';
  }

}

async function faiblesse(miloud) {
  const response = await fetch('https://pokeapi.co/api/v2/type/' + miloud);
  const data  = await response.json();
  const listFaiblesse = document.querySelectorAll('.type-list ')[1];
  // console.log(data);
  for (const iterator of data.damage_relations.double_damage_from) {
    const li = document.createElement('li');
    const btn1 = document.createElement('button');
    btn1.classList.add(iterator.name);
    btn1.textContent = iterator.name;
    listFaiblesse.appendChild(li);
    li.appendChild(btn1);
  }
}

async function stats(){
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + appData.pokemon);
  const data  = await response.json();
  for (const iterator of data.stats) {
    const statsPokemon = document.querySelector(".stats");
    statsPokemon.classList.add(iterator.stat.name + '-' + Math.round(iterator.base_stat * 15/100)); 
    console.log(statsPokemon);
  }
}

// async function evolution(){
//   const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/' + appData.pokemon);
//   const data  = await response.json();
// }

