const currentPokemon = window.location.href.split('?pokemon=')[1];
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
    const pokemonInfo = document.getElementById("pokemonInfo");
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const img = document.createElement("img");

    const moves = pokemon.moves;
    moves.forEach(move => {
        const li = document.createElement("li");
        li.textContent = move.move.name;
        ul.appendChild(li);
    });

    img.src = pokemon.sprites.front_default;
    div.appendChild(img);
    div.appendChild(ul);
    pokemonInfo.appendChild(div);

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