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
        return `A ${this.size} pizza, with ${this.crust} crust, ${this.sauce} sauce, ${this.cheese} cheese, and the following toppings:\n\t-${this.toppings.join("\n\t-")}`;
    }
}
order.addEventListener('click', function(event){
    event.preventDefault();// prevent the form from submitting and refreshing the page
    let newPizza = new Pizza(// get selected values only and create a new Pizza object using the Pizza class constructor with checked values as parameters
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
    pizzaObjects.push(newPizza);
    pizza.id = `pizza-${pizzaObjects.length}`;
    pizzaList.push(pizza);
    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove Pizza";
    deleteBtns.push(deleteBtn);
    deleteBtn.id = `delete-${pizzaObjects.length}`;
    pizza.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function(event){
        event.preventDefault();
        let pizzaId = event.target.id.split("-")[1];//split the string in the id to get the id number only
        let pizzaToDelete = document.getElementById(`pizza-${pizzaId}`);
        pizzas.removeChild(pizzaToDelete);
        pizzaObjects.splice(pizzaId - 1, 1);
        deleteBtns.splice(pizzaId - 1, 1);
        pizzaList.splice(pizzaId - 1, 1);
        for (let i = 0; i < pizzaObjects.length; i++) {
            pizzaList[i].id = `pizza-${i + 1}`;
            deleteBtns[i].id = `delete-${i + 1}`;
        };
    });

    pizzas.appendChild(pizza);
    
    
    
});



/*
Write JavaScript to capture the values from each of the form inputs when the user clicks the 'order' button.

Create a class called Pizza using the parameters from the order form. The class must include at least one method that builds and returns a description of the pizza order as a string.

When the form is submitted and validated, instantiate a new Pizza object from your class using the captured form values. Visually output the pizza description to the HTML page by invoking the method on your Pizza object — the displayed text must come from that method, not directly from the form values. 

*/
