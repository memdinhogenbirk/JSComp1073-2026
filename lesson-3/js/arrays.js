const output = document.querySelector('body p:nth-of-type(2)');

/* STEP 1: Creating an array
When declaring and initializing an array, you can include strings, numbers, booleans, and even other arrays */
let myArray = ["string3", true, 100, [5, "string2"]];
/* STEP 2: Reading and changing array elements
You can refer to a particular element in an array with it's index number */
indexZero = myArray[0]
// You can also change a particular element
myArray[1] = false;
// An array within an array is called a multidimensional array - it can be accessed by specifying the index of the first array, then the item within it
subArrayIndexZero = myArray[3][0];
//output.textContent = `The third el in the array is ${String(myArray[2])}, which is a ${typeof(myArray[2])}`;
/* STEP 3: Determining array length
Being able to figure out how many elements are contained in an array is a critical feature of JavaScript programming */
arrayLength = myArray.length;
let newString = "";
// In particular, looping through arrays
for (let i = 0; i < myArray.length; i++) {
    if(Array.isArray(myArray[i])){
        for(let j=0; j<myArray[i].length; j++){
           newString += myArray[i][j] + " "; 
        }
    }
    else
    newString += myArray[i] + " ";
}
newString = newString.slice(0,newString.length-1);
//output.textContent = newString;
/* STEP 4: Convert a string to an array
If there is a common character that can act as a delimiter in a string, we can use this character to create an array */
// stringToArray = newString.split(" ");
// output.textContent = stringToArray;
let orig6 = "Toronto Maple Leafs, Chicago Blackhawks, Detroit Red Wings, Boston Bruins, Montréal Canadiens, New York Rangers";
let orig6Array = orig6.split(", ");

// Output one of the array items
//output.textContent = orig6Array[0];
// Output the last element of the array
//output.textContent = orig6Array.at(-1);

/* STEP 5: Convert an array back to a string
Use join() and toString() - note that join() allows you to choose and insert a delimiter, while toString() does not */
//let orig6String = orig6Array.toString();
let orig6String = orig6Array.join(" | ")
//output.textContent = orig6String;
/* STEP 6: Adding and removing items from an array
Without the ability to edit the contents of an array, this type of variable would have limited use - but adding and removing array items is pretty straightforward */

//output.textContent = orig6Array;

// Adding one or more items to an array with push()
orig6Array.push("Buffalo Sabres", "Reno Rhinos");//append array, returns array length

// If you would like to capture how many elements are in the array after you have edited it, then…
// To do the same thing, that is, to add and remove an item from the beginning of the array, use unshift()
const newArrayLength = orig6Array.unshift("Fake team");//prepend array, returns new length

//output.textContent = newArrayLength;

// Removing an item from an array with pop() (last item) or shift() (first item), no parameters
// pop() returns the item that was removed, rather than the length of the updated array, so…
let itemRemoved = orig6Array.pop();//returns last of array and removes it from array
let removedItem = orig6Array.shift();//pop but for first item of array
//output.textContent=itemRemoved;
/*unshift is the opposite of push, shift is the opposite of pop (terrible naming convention) */


// We can also modify the array contents by deleting or substituting elements, or inserting one or more elements at a certain place with splice()
orig6Array.splice(0,2, "HELLO")//first param = index to insert, second = how many elements to remove right to left, third = element to insert
/* That's it for the basics of working with arrays! With these tools at your disposal, a whole new world of possibilities with JavaScript are at your command */