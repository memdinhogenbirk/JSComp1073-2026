//dynamically added student info
const studentInfo = document.getElementById("studentInfo");
studentInfo.textContent = "Name: Michael Number: 200340292"

const formSize = document.querySelectorAll('input[name="size"]');
const formCrust = document.querySelectorAll('input[name="crust"]');
const formSauce = document.querySelectorAll('input[name="sauce"]');
const formCheese = document.querySelectorAll('input[name="cheese"]');
const formToppings = document.querySelectorAll('input[name="toppings"]');
const order = document.getElementById('order');
const reset = document.getElementById('reset');
const pizzas = document.getElementById('pizzas');

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
    pizza.textContent = newPizza.displayPizza();

    let deleteBtn = document.createElement("button");// create a delete button for the new pizza so it can be removed
    deleteBtn.textContent = "Remove Pizza";

    let br = document.createElement("br");// create a line break to separate the pizza description from the delete button

    pizzaObjects.push(newPizza);// add the new pizza object to the pizzaObjects array for future reference and manipulation
    pizza.id = `pizza-${pizzaObjects.length}`;// set id of new el based on length of pizzaObject array
    pizzaList.push(pizza);// add pizza to pizzaList array for id adjustment upon deletion of a pizza
    
    deleteBtns.push(deleteBtn);// add delete button to deleteBtns array for id adjustment upon deletion of a pizza
    deleteBtn.id = `delete-${pizzaObjects.length}`;// give delete button id based on index (the end of/ length of the pizzaObjects array)
    pizza.appendChild(br);// append the line break to the pizza li element
    pizza.appendChild(deleteBtn);// append the delete button to the pizza li element
    
    pizzas.appendChild(pizza);// append the new pizza li element to the ul list of pizzas

    // delete function added to the new pizza's delete button
    deleteBtn.addEventListener('click', function(event){
        event.preventDefault();
        let pizzaId = event.target.id.split("-")[1];// split the string in the id to get the id number only
        let pizzaToDelete = document.getElementById(`pizza-${pizzaId}`);// get html element to remove by id matching corresponding delete button
        pizzas.removeChild(pizzaToDelete);// remove the whole li element from the ul list of pizzas

        // remove the corresponding pizza object, delete button, and pizza li element from their respective arrays
        pizzaObjects.splice(pizzaId - 1, 1);// ids start at 1, index starts at 0, -1 to accommodate
        deleteBtns.splice(pizzaId - 1, 1);
        pizzaList.splice(pizzaId - 1, 1);

        // for to reassign the ids of the remaining pizza li elements and delete buttons to match their new index in the arrays
        for (let i = 0; i < pizzaObjects.length; i++) {
            pizzaList[i].id = `pizza-${i + 1}`;
            deleteBtns[i].id = `delete-${i + 1}`;
        };
    });

    
    
    
    
});



/*
Write JavaScript to capture the values from each of the form inputs when the user clicks the 'order' button.

Create a class called Pizza using the parameters from the order form. The class must include at least one method that builds and returns a description of the pizza order as a string.

When the form is submitted and validated, instantiate a new Pizza object from your class using the captured form values. Visually output the pizza description to the HTML page by invoking the method on your Pizza object — the displayed text must come from that method, not directly from the form values. 

*/
