/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const header = document.querySelector("header");
const section = document.querySelector("section");


// STEP 3a: Create the asynchronous function populate()
async function populate() {
    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4a: Create i-scream.json file with companyName, headOffice, established, active, topFlavors(name, calories, type, ingredients, image) */
    // STEP 4b: Store the URL of a JSON file in a variable */
    const url = "https://memdinhogenbirk.github.io/JSComp1073-2026/lesson-11/js/i-scream.json";
    // STEP 5: Use the new URL to create a new request object
    const request = new Request(url);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request);
    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    const responseJSON = await response.json();
    // STEP 8: Output the iScream JSON object to the console
    console.log(responseJSON);

    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(responseJSON);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(responseJSON);
}
// STEP 3b: Call the populate() function
populate();
/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonObj) {
// Create the H1 element
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
// Grab the company name from the JSON object and use it for the text node
    h1.textContent = jsonObj.companyName;
    p.textContent = `Head Office: ${jsonObj.headOffice}\nEstablished: ${jsonObj.established}\nActive: ${jsonObj.active ? "Active" : "Inactive"}`;
// Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
    header.appendChild(p);
}
// STEP 10c: Bind the JSON topFlavors object to a var
function showTopFlavors(jsonObj) {
// STEP 10d: Loop through the topFlavors object
    let topFlavors = jsonObj.topFlavors;
    for (let i = 0; i < topFlavors.length; i++) {
// STEP 10e: build HTML elements for the content: article, h2, image, p1, p2, list
        let article = document.createElement("article");
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let img = document.createElement("img");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let small = document.createElement("small");
        let ul = document.createElement("ul");
// STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        h2.textContent = topFlavors[i].name;
        h3.textContent = topFlavors[i].type;
        img.src = topFlavors[i].image;
        img.alt = topFlavors[i].name;
        p1.textContent = `Calories: ${topFlavors[i].calories}`;
        p2.textContent = `Ingredients: ${topFlavors[i].ingredients.join(", ")}`;
        small.textContent = `Rating: ${topFlavors[i].rating}`;

// STEP 10g: Build a loop for the ingredients array in the JSON
        for (let j = 0; j < topFlavors[i].ingredients.length; j++) {
// STEP 10h: Create a list item for each ingredient and append to the UL element
            let li = document.createElement("li");
            li.textContent = topFlavors[i].ingredients[j];
            ul.appendChild(li);
        }
// STEP 10i: Append each complete ARTICLE element to the SECTION element
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(img);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(ul);
        article.appendChild(small);
        section.appendChild(article);
    }
}
// STEP 11: Add a 3rd flavour of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations
