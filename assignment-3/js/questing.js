const dynamicInfo = document.getElementById("dynamicInfo");
dynamicInfo.textContent = "Name: Michael Emdin-Hogenbirk | Student ID: 200340292";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
//const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const urlToSearch = baseUrl;
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