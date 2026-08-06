const dynamicInfo = document.getElementById("dynamicInfo");

const nakedUrl = "https://apps.runescape.com/runemetrics/quests?user=";
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const urlToSearch = nakedUrl + searchInput.value;
    console.log(urlToSearch); 
    fetchResults(urlToSearch);
});

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
    })
    .catch(error => {
        console.error(error);
    });
}