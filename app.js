
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
       <img class= "card-image" alt= "${pokemon.name} "src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
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



