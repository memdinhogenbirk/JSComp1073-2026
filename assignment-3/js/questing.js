const dynamicInfo = document.getElementById("dynamicInfo");

const nakedUrl = "https://apps.runescape.com/runemetrics/quests?user=";
const search = document.getElementById("search").value;
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.getElementById("search").value;
    const urlToSearch = nakedUrl + search; 
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