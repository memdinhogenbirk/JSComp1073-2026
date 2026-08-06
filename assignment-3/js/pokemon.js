const dynamicInfo = document.getElementById("dynamicInfo");
dynamicInfo.textContent = "Name: Michael Emdin-Hogenbirk | Student ID: 200340292";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const pokemonList = document.getElementById("pokemonList");
const pageCount = document.getElementById("pageCount");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const urlToSearch = baseUrl;
    console.log(urlToSearch); 
    //fetchResults(urlToSearch);
});

fetchResults(baseUrl);

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
        displayPokemonList(json.results);
        addPageIndexes(json.count);
    })
    .catch(error => {
        console.error(error);
    });
}
function displayPokemonList(pokemonArray) {
    pokemonArray.forEach(pokemon => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        //console.log(pokemon.url.split('/')); //viewing the array to determine the index of the pokemon id (index 6)
        const img = document.createElement("img");
        const imgCaption = document.createElement("p");
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        p.textContent = pokemon.name.toUpperCase();
        imgCaption.textContent = `#${pokemon.url.split('/')[6]}`;
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(imgCaption);
        
        pokemonList.prepend(div);
    });
}
function addPageIndexes(count) {
    let pageCountNum = Math.ceil(count / 12);
    for (let i = 1; i <= pageCountNum; i++) {
        const pageNum = document.createElement("a");
        pageNum.textContent = i;
        pageNum.href = "#";
        pageNum.addEventListener("click", (event) => {
            event.preventDefault();
            const urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(i - 1) * 12}`;
            console.log(urlToSearch);
            fetchResults(urlToSearch);
        });
        pageCount.appendChild(pageNum);
    }
}