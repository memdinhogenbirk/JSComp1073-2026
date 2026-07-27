//dynamically added student info
const studentInfo = document.getElementById("studentInfo");
studentInfo.textContent = "Name: Michael Number: 200340292"

// get radio data from form submission
const formSize = document.querySelectorAll('input[name="size"]');
const formCrust = document.querySelectorAll('input[name="crust"]');
const formSauce = document.querySelectorAll('input[name="sauce"]');
const formCheese = document.querySelectorAll('input[name="cheese"]');
// get toppings data from check boxes
const formToppings = document.querySelectorAll('input[name="toppings"]');
//get buttons
const order = document.getElementById('order');
const reset = document.getElementById('reset');
const pizzas = document.getElementById('pizzas');
const indexingBtns = Array.from(document.getElementById('indexingBtns').children);
// add click event listeners to all indexing buttons immediately
indexingBtns.forEach(element => {
    element.addEventListener('click', function(){
        currentPizza(element.id.split("-")[1]); // currentPizza function (see bottom) reveals the pizza the user clicks via the indexbtns
        activeBtn(element); // index button visually changes too, indicating which pizza corresponds to which index
    })
});

// arrays to store pizza objects, html li elements (pizza outputs), and delete buttons (contained in the html li elements) for pizzas
let pizzaObjects = [];
let pizzaList = [];
let deleteBtns = [];

// Pizza class
class Pizza {
    size;
    crust;
    sauce;
    toppings;
    //constructor
    constructor(size, crust, sauce, cheese, toppings){
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.cheese = cheese;
        this.toppings = toppings;
    }
    //pizza description output method
    displayPizza(){
        return `A ${this.size} pizza, with ${this.crust} crust, ${this.sauce} sauce, ${this.cheese} cheese, and the following toppings:\n\t-${this.toppings.length === 0 ? "None" : this.toppings.join("\n\t-")}`;
    }
}

order.addEventListener('click', function(event){
    event.preventDefault();// prevent the form from submitting and refreshing the page
    if(pizzaObjects.length >= 5){
        alert("You have reached the maximum number of pizzas (5). Please remove a pizza before adding another.");
        return;
    }
    let newPizza = new Pizza(// get selected values only and create a new Pizza object using the Pizza class constructor with checked values from form as parameters
        document.querySelector('input[name="size"]:checked').value,
        document.querySelector('input[name="crust"]:checked').value,
        document.querySelector('input[name="sauce"]:checked').value,
        document.querySelector('input[name="cheese"]:checked').value,
        // checklist is turned into an array due to multiple values.
        Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.value)
    );
    //preparing new elements to be added to the page
    let pizza = document.createElement("li");
    pizza.textContent = newPizza.displayPizza(); // call displayPizza method for pizza description string

    let deleteBtn = document.createElement("button");// create a delete button for the new pizza so it can be removed
    deleteBtn.textContent = "Remove Pizza";

    let br = document.createElement("br");// create a line break to separate the pizza description from the delete button

    pizzaObjects.push(newPizza);// add the new pizza object to the pizzaObjects array for future reference and manipulation
    pizza.id = `pizza-${pizzaObjects.length}`;// set id of new el based on length of pizzaObject array
    pizzaList.push(pizza);// add pizza to pizzaList array for applications that require the element info, not the object
    // set all pizza li elements to hidden first
    pizzaList.forEach(p => {
        p.setAttribute("class", "hidden");
    });
    // then default users view to last pizza added
    pizzaList.at(-1).setAttribute("class", "viewing");
    activeBtn(indexingBtns[(pizzaList.length -1)]);// do the same for index buttons
    
    
    deleteBtns.push(deleteBtn);// add delete button to deleteBtns array for id adjustment upon deletion of a pizza
    deleteBtn.id = `delete-${pizzaObjects.length}`;// give delete button id based on index (the end of/ length of the pizzaObjects array)
    pizza.appendChild(br);// append the line break to the pizza li element
    pizza.appendChild(deleteBtn);// append the delete button to the pizza li element
    
    pizzas.appendChild(pizza);// append the new pizza li element to the ul list of pizzas
    viewIndexes(pizzaObjects.length);

    // delete function added to the new pizza's delete button
    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        let pizzaId = event.target.id.split("-")[1];// split the string in the id to get the id number only
        let pizzaToDelete = document.getElementById(`pizza-${pizzaId}`);// get html element to remove by id matching corresponding delete button
        pizzas.removeChild(pizzaToDelete);// remove the whole li element from the ul list of pizzas

        // remove the corresponding pizza object, delete button, and pizza li element from their respective arrays
        pizzaObjects.splice(pizzaId - 1, 1);// ids start at 1, index starts at 0, -1 to accommodate
        deleteBtns.splice(pizzaId - 1, 1);
        pizzaList.splice(pizzaId - 1, 1);
        hideIndexes(pizzaObjects.length);// hide any indexing buttons that are no longer needed
        // if the pizzaList isnt empty after deletion, run activeBtn and currentPizza functions to set users view to last pizza in list
        if(pizzaList.length > 0) {
            activeBtn(indexingBtns[(pizzaList.length -1)]);
            currentPizza(indexingBtns[(pizzaList.length -1)]);
            pizzaList.at(-1).setAttribute("class", "viewing"); // default to showing last pizza added when removing pizzas
        }

        // for to reassign the ids of the remaining pizza li elements and delete buttons to match their new index in the arrays
        for (let i = 0; i < pizzaObjects.length; i++) {
            pizzaList[i].id = `pizza-${i + 1}`;
            deleteBtns[i].id = `delete-${i + 1}`;
        };
    });

    // functions for activating indexing buttons based on number of objects
    
    function viewIndexes(index){ // function changes visual appearance of indexes based on an index value passed in parameters
        for (let i = 0; i < index; i++) {
            indexingBtns[i].classList.remove("inactive");
            indexingBtns[i].classList.add("active");
            indexingBtns[i].removeAttribute("disabled"); // function also ensures the button is clickable
        }
    };
    function hideIndexes(index){ // function visually changes appearance of indexes to indicate they are not clickable
        for (let i = index; i < indexingBtns.length; i++) {
            indexingBtns[i].classList.add("inactive");
            indexingBtns[i].classList.remove("active");
            if(indexingBtns[i].classList.contains("currentBtn")){ // ensures the currentBtn visual change is also undone
                indexingBtns[i].classList.remove("currentBtn");
            }
            indexingBtns[i].setAttribute("disabled", "true"); // function also disables the index buttons that should not be clickable anymore
        }
    };
});
// function for pizza being viewed, CSS will hide or reveal each pizza depending on the class applied by JS
function currentPizza(id){
    pizzaList.forEach(pizza => {
        if(pizza.id.split("-")[1] === id){
            pizza.classList.add("viewing");
            pizza.classList.remove("hidden");
        }
        else{
            pizza.classList.remove("viewing");
            pizza.classList.add("hidden");
        }
    });
}
// function for visually changing index buttons to indicate which one is selected or is being selected
function activeBtn(current){
    indexingBtns.forEach(btn =>{
        btn.classList.remove("currentBtn");
    })
    current.classList.add("currentBtn");
}
