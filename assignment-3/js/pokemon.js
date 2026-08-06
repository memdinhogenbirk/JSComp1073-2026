const dynamicInfo = document.getElementById("dynamicInfo");
dynamicInfo.textContent = "Name: Michael Emdin-Hogenbirk | Student ID: 200340292";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const pokemonList = document.getElementById("pokemonList");

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
    pokemonList.innerHTML = "";
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
        
        pokemonList.appendChild(div);
    });
}
function addPageIndexes(count) {
    const pageIndex = document.createElement("span");
    const pageIndexFwd = document.createElement("a");
    const pageIndexBack = document.createElement("a");

    pageIndexFwd.textContent = ">";
    pageIndexBack.textContent = "<";
    pageIndex.innerHTML = "";
    let pageCountNum = Math.ceil(count / 12);
    for (let i = 1; i <= 5; i++) {
        let pageNum = document.createElement("a");
        pageNum.textContent = i +" | ";
        pageNum.href = "#";
        pageNum.addEventListener("click", (event) => {
            event.preventDefault();
            let urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(i - 1) * 12}`;
            console.log(urlToSearch);
            fetchResults(urlToSearch);
        });
        pageIndex.appendChild(pageNum);
    }
    let specificPageNum = document.createElement("a");
    specificPageNum.textContent = "... | ";
    specificPageNum.href = "#";


    let lastPageNum = document.createElement("a");
    lastPageNum.textContent = pageCountNum;
    lastPageNum.href = "#";
    pageIndex.prepend(pageIndexBack);
    pageIndex.appendChild(specificPageNum);
    pageIndex.appendChild(lastPageNum);
    pageIndex.appendChild(pageIndexFwd);
    pokemonList.appendChild(pageIndex);


    specificPageNum.addEventListener("click", (event) => {
        event.preventDefault();
        let specificPage = prompt("Enter a page number between 1 and " + pageCountNum);
        if (specificPage >= 1 && specificPage <= pageCountNum) {
            let urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(specificPage - 1) * 12}`;
            console.log(urlToSearch);
            fetchResults(urlToSearch);
        }
    });
}