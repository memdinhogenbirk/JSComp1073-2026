//https://pokeapi.co/docs/v2#pokemon-section
const dynamicInfo = document.getElementById("dynamicInfo");
dynamicInfo.textContent = "Name: Michael Emdin-Hogenbirk | Student ID: 200340292";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";
const searchInput = document.getElementById("search");
const pokemonList = document.getElementById("pokemonList");
const names = [];
const dropdown = document.getElementById("dropdown");

let currentPage = 1;
let totalPages = 1;


searchInput.addEventListener("input", (event) => {
    event.preventDefault();
    searchPokemonNames();
    dropdown.removeAttribute("hidden");
    document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && event.target !== searchInput) {
        dropdown.setAttribute("hidden", "");
    }
}, { once: true });
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
        const anchor = document.createElement("a");
        anchor.classList.add("pokemonAnchor");
        //`https://pokeapi.co/api/v2/pokemon/${pokemon.url.split('/')[6]}`
        anchor.href = `pokemonInfo.html?pokemon=${pokemon.url.split('/')[6]}`;
        anchor.target = "_blank";//open in new tab

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
        anchor.appendChild(div);
        pokemonList.appendChild(anchor);
    });
}

function addPageIndexes(count) {
    totalPages = Math.ceil(count / 12);
    const existing = document.getElementById("pageIndex");
    if (existing) {existing.remove();}

    const pageIndex = document.createElement("span");
    pageIndex.id = "pageIndex";

    
    const pageIndexBack = document.createElement("a");
    pageIndexBack.textContent = "<";
    pageIndexBack.href = "#";
    pageIndexBack.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    const pageIndexFwd = document.createElement("a");
    pageIndexFwd.textContent = ">";
    pageIndexFwd.href = "#";
    pageIndexFwd.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });
    

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
        start = Math.max(1, end - 4);
    }
    if (start > 1) {
        const dots = document.createElement("a");
        dots.textContent = "... | ";
        dots.href = "#";
        dots.addEventListener("click", (e) => {
            e.preventDefault();
            const specificPage = prompt(`Enter a page number between 1 and ${totalPages}`);
            if (specificPage >= 1 && specificPage <= totalPages) {
                goToPage(Number(specificPage));
            }
        });
        pageIndex.appendChild(dots);
    }

    pageIndex.innerHTML = "";
    for (let i = start; i <= end; i++) {
        let pageNum = document.createElement("a");
        pageNum.textContent = i +" | ";
        pageNum.href = "#";
        if (i === currentPage) {
            pageNum.style.fontWeight = "bold";
            pageNum.style.textDecoration = "underline";
        }
        pageNum.addEventListener("click", (event) => {
            event.preventDefault();
            let urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(i - 1) * 12}`;
            console.log(urlToSearch);
            goToPage(i);
        });
        pageIndex.appendChild(pageNum);
    }
    let specificPageNum = document.createElement("a");
    specificPageNum.textContent = "... | ";
    specificPageNum.href = "#";


    let lastPageNum = document.createElement("a");
    lastPageNum.textContent = totalPages;
    lastPageNum.href = "#";
    lastPageNum.addEventListener("click", (event) => {
        event.preventDefault();
        let urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(totalPages - 1) * 12}`;
        console.log(urlToSearch);
        goToPage(totalPages);
    });
    
    pageIndex.prepend(pageIndexBack);
    pageIndex.appendChild(specificPageNum);
    pageIndex.appendChild(lastPageNum);
    pageIndex.appendChild(pageIndexFwd);
    if(currentPage === totalPages){
        pageIndexFwd.classList.add("disabled");
        lastPageNum.classList.add("disabled");
    }
    else{
        pageIndexFwd.classList.remove("disabled");
        lastPageNum.classList.remove("disabled");
    }
    pokemonList.appendChild(pageIndex);


    specificPageNum.addEventListener("click", (event) => {
        event.preventDefault();
        let specificPage = prompt("Enter a page number between 1 and " + totalPages);
        if (specificPage >= 1 && specificPage <= totalPages) {
            let urlToSearch = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(specificPage - 1) * 12}`;
            //console.log(urlToSearch);
            goToPage(Number(specificPage));
        }
    });
}
function goToPage(page) {
    currentPage = page;
    const offset = (page - 1) * 12;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`;
    //console.log(url);
    fetchResults(url);
}
function searchPokemonNames() {
    names.length = 0; // Clear the names array before searching
    dropdown.innerHTML = ""; // Clear the dropdown
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0")
    .then(response => response.json())
    .then(data => {
        if(!searchInput.value.trim()) {
            dropdown.setAttribute("hidden", "true");
            return;
        }
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].name.toLowerCase().startsWith(searchInput.value.toLowerCase())) {
                names.push(data.results[i].name);
                const searchListItem = document.createElement("li");
                const anchor = document.createElement("a");
                anchor.href = `pokemonInfo.html?pokemon=${data.results[i].name}`;
                anchor.target = "_blank";
                anchor.textContent = data.results[i].name;
                searchListItem.appendChild(anchor);
                dropdown.appendChild(searchListItem);
            }
        }
        console.log(names);
        //searchPokemonByName(names, searchInput.value.toLowerCase());
    })
    .catch(error => {
        console.error(error);
    });
}