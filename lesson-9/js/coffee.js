const output = document.querySelector("#output");

/* STEP 1: Instead of a constructor function, let's try a JavaScript class called 'Coffee' */
class Coffee {
    size;
    decaf;

    constructor(size, decaf){
        this.size = size;
        this.decaf = decaf;
    }
// add a serveIt method
    serveIt(desc){

// 2. Select your target parent or sibling element
        const output = document.querySelector('#output');
// Generate an IMG of the coffee ordered
        let coffeeImg = document.createElement('img');
        coffeeImg.src = this.decaf ? "images/coffee-cup-purple.svg" : "images/coffee-cup-green.svg";

// Set the src path for the IMG element

// Determine caffeine status of the coffee
        switch (this.size) {
            case "small":
              coffeeImg.style.height = "50px";
              break;
            case "medium":
              coffeeImg.style.height = "100px";
              break;
            case "large":
              coffeeImg.style.height = "150px";
              break;
            default:
              break;
            // Code runs if no cases match
        }
// Set the size of the cup SVG image based on this.size
        if(desc === null){
          desc = `A ${this.size}, ${this.decaf ? "decaf " : ""}coffee.`;
        }
// Size the IMG in terms of its height based on above number from the switch

// Generate a description of the coffee and put it into the IMG title attribute
        coffeeImg.title = desc;
// Insert the new IMG element into the paragraph
        output.append(coffeeImg);
    }

}
/* STEP 2: Instatiate a coffee based on the above constructor function */
let coffee = new Coffee("large", false);
coffee.serveIt(null);
/* STEP 3: Add a method to the Coffee class called serveIt() */

let coffee2 = new Coffee("small", true);
coffee2.serveIt(null);
/* STEP 4: Call up the serveIt() method */

/* STEP 5: Define a subclass of the Coffee class */
class Latte extends Coffee{
  milkType;
  constructor(size, decaf, milkType){
    super(size, decaf);
    this.milkType = milkType;
  }
  latteDesc(){
    return `A ${this.size} latte with ${this.milkType} milk`;
  }
  
}
/* STEP 6: Create a new instance of the Latte object */

/* STEP 7: Call up the latteDesc() method for the above created Latte instance */
let latte = new Latte("small", true, "almond");
latte.serveIt(latte.latteDesc());
/* STEP 8: Create yet another instance of Latte using the console, and try the latteDesc() method from the subclass, as well as the serveIt() method from the parent class */

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG

//*********************LAB*******************************

class FrenchVanilla extends Latte{
  whippedCream;
  constructor(size, decaf, milkType, whippedCream){
    super(size, decaf, milkType);
    this.whippedCream = whippedCream ? "" : " no";
  }
  frenchVanillaDesc(){
    return `A ${this.size} latte with ${this.milkType} milk and${this.whippedCream} whipped cream`;
  }
}

frenchV1 = new FrenchVanilla("medium", true, "cow", true);
frenchV2 = new FrenchVanilla("large", true, "no", false);

frenchV1.serveIt(frenchV1.frenchVanillaDesc());
frenchV2.serveIt(frenchV2.frenchVanillaDesc());

//PLEASE NOTE: Descriptions are displayed on the page as title properties. Hover over the image, you will see them