dynamicInfo.textContent = "Name: Michael Emdin-Hogenbirk | Student ID: 200340292";
const currentPokemon = window.location.href.split('?pokemon=')[1];
const pokemonInfo = document.getElementById("pokemonInfo");
const pokemonName = document.getElementById("pokemonName");

//https://pokeapi.co/docs/v2#pokemon
console.log(currentPokemon);
//`https://pokeapi.co/api/v2/pokemon/${pokemon.url.split('/')[6]}`
const url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`;
fetchResults(url);

function fetchResults(url) {
fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('There has been an error')
        }
        return response.json();
    })
    .then(json =>{
        console.log(json);
        displayPokemon(json);
    })
    .catch(error => {
        console.error(error);
    });
}
function displayPokemon(pokemon) {
    pokemonName.textContent = pokemon.name.toUpperCase();
    const divMoves = document.createElement("div");
    divMoves.id = "divMoves";
    const divInfo = document.createElement("div");
    divInfo.id = "divInfo";


    const ulMoves = document.createElement("ul");
    const liHeight = document.createElement("li");
    liHeight.textContent = `Height: ${pokemon.height}`;
    const liWeight = document.createElement("li");
    liWeight.textContent = `Weight: ${pokemon.weight}`;
    const liAbilities = document.createElement("li");
    liAbilities.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;

    const img = document.createElement("img");

    const moves = pokemon.moves;
    moves.forEach(move => {
        const li = document.createElement("li");
        li.textContent = move.move.name;
        ulMoves.appendChild(li);
    });

    img.src = pokemon.sprites.front_default;
    divInfo.appendChild(liHeight);
    divInfo.appendChild(liWeight);
    divInfo.appendChild(liAbilities);

    pokemonInfo.appendChild(img);
    divMoves.appendChild(ulMoves);
    pokemonInfo.appendChild(divInfo);
    pokemonInfo.appendChild(divMoves);
    

}
/*id:35
name:"clefairy"
base_experience:113
height:6
is_default:true
order:56
weight:75
is_hidden:true
slot:3
name:"friend-guard"
url:"https://pokeapi.co/api/v2/ability/132/"
name:"clefairy"
url:"https://pokeapi.co/api/v2/pokemon-form/35/"
game_index:35
name:"white-2"
url:"https://pokeapi.co/api/v2/version/22/"
name:"moon-stone"
url:"https://pokeapi.co/api/v2/item/81/"
location_area_encounters:"/api/v2/pokemon/35/encounters"
name:"pound"
url:"https://pokeapi.co/api/v2/move/1/"
name:"clefairy"
url:"https://pokeapi.co/api/v2/pokemon-species/35/"
back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png"
back_female:null
back_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png"
back_shiny_female:null
front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
front_female:null
front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png"
front_shiny_female:null
latest:"https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/35.ogg"
legacy:"https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/35.ogg"
base_stat:35
effort:0
name:"speed"
url:"https://pokeapi.co/api/v2/stat/6/"
slot:1
name:"fairy"
url:"https://pokeapi.co/api/v2/type/18/" */