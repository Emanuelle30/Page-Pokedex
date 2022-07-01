
//Comunica com Api (requisições)
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//Array de 45 itens 
const generatePokemomPromises = () => Array(45).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

/* adiciona o novo elemento criado e seu conteúdo ao DOM 
redução do array*/
const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

    //juntar os valores
    accumulator += `
       <li class= "card ${types[0]}">
       <img class= "card-image" alt= "${pokemon.name} 
       "src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
           <h2 class= "card-title">${pokemon.id}. ${pokemon.name}</h2>
           <p class= "card-sub-title">${types.join(' | ')}</p>
       </li>`

    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
//retorno de objeto assíncrono
const pokemonPromises = generatePokemomPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)

    //Pesquisar pokemon

    document.querySelector("#search").addEventListener("click", getPokemon);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function lowerCaseName(string) {
      return string.toLowerCase();
    }
    
    function getPokemon(e) {
      const name = document.querySelector("#pokemonName").value;
      const pokemonName = lowerCaseName(name);
    
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
          document.querySelector(".pokemonBox").innerHTML = `
          <div>
            <img
              src="${data.sprites.other["official-artwork"].front_default}"
              alt="Pokemon name"
            />
          </div>
          <div class="pokemonInfos">
            <h1>${capitalizeFirstLetter(data.name)}</h3>
            <p>Weight: ${data.weight}</p>
            <p>Height: ${data.height}</p>            
          </div>`;
        })
        .catch((err) => {
          document.querySelector(".pokemonBox").innerHTML = `
          <h4>Pokemon not found 😞</h4>
          `;
          console.log("Pokemon not found", err);
        });
    
      e.preventDefault();
    }

    


