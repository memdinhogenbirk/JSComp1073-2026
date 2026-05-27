document.addEventListener('DOMContentLoaded', () => {
const surprisesBtn = document.querySelector('#surprises');//randomize
const resetBtn = document.querySelector('#reset');//reset story
const playbackBtn = document.querySelector('#playback');//outputstory
const storyDivided = document.querySelectorAll('#storyDivided h4');//these h4s are where the story will show up
//buttons for story element column
const col1Btn = document.querySelector('#Col1btn');
const col2Btn = document.querySelector('#Col2btn');
const col3Btn = document.querySelector('#Col3btn');
const col4Btn = document.querySelector('#Col4btn');
const col5Btn = document.querySelector('#Col5btn');
const colBtnArray = [col1Btn, col2Btn, col3Btn, col4Btn, col5Btn];

//arrays for story element columns
const col1Array = document.querySelectorAll('#Col1 li');
const col2Array = document.querySelectorAll('#Col2 li');
const col3Array = document.querySelectorAll('#Col3 li');
const col4Array = document.querySelectorAll('#Col4 li');
const col5Array = document.querySelectorAll('#Col5 li');
//make array of colum arrays.
const colArray = [col1Array, col2Array, col3Array, col4Array, col5Array];
//column index variables, default to 0 start of array. Each array item is the index of one of the word columns. 
let indices = [0, 0, 0, 0, 0];
//output array, default blank values.
let outputArray = ["______", "______", "______", "______", "______"];
/*forEach btn, add click listener, pass btn element and its index in the array as column number to buttonClicked function.
Index parameter use courtesy of Ashwini Paraye https://ashwini-paraye.medium.com/the-complete-guide-to-javascripts-foreach-method-ebaa370950c8
saves a lot of code*/
colBtnArray.forEach((btn, index) => {
    btn.addEventListener('click', () => buttonClicked(index));
});
function buttonClicked(columnNumber) {
    //get current array for column number (handled by forEach and passed as argument to this function).
    const currentColumn = colArray[columnNumber];
    //run word highlighting function (see below)
    highlightWord(columnNumber);
    //iterate through array until length of column reached (last word/words in list).
    if (indices[columnNumber] < currentColumn.length) {
        outputArray[columnNumber] = currentColumn[indices[columnNumber]].textContent.slice(2);
        /*you may be wondering, why .slice(2)? Emojis are apparently worth 2 string indices, 
        so this removes the emoji and space from the text content of the list item, leaving just the word or phrase.
        
        Beyond that, 
        - outputArray is the final result that is displayed and read aloud by the screen reader.
        - columnNumber is being used to determine which column the user is on, and is used to index the...
        currentColumn, which is the column the user is clicking through (e.g. The turkey, mom, dad... or goat, monkey, fish...)
        - indices is an array that holds an incrementor for each of those columns to determine what string ought to be placed into
        the final output (also uses columnNumber to determine which index in the indices array should be incremented)
        To summarize: 
            - currentColumn = a sub array from colArray, selected by columnNumber arg passed in buttonClicked function
            - indicies array is indexed using the same columnNumber (e.g. if columnNumber is 1, we are increasing [0,this,0,0,0])
            - then index (e.g. currentColumn[this]) to say which li element we are on, then get it's textContent
        */
        indices[columnNumber]++;//and here is where the indices indexes are incremented
    }
    //if index is at end of array, reset to 0 and start over.
    else {
        indices[columnNumber] = 0;
        
        outputArray[columnNumber] = currentColumn[indices[columnNumber]].textContent.slice(2);
        indices[columnNumber]++;
    }
}
//reset everything to default values.
resetBtn.addEventListener('click', function() {
    outputArray = ["______", "______", "______", "______", "______"];
    indices = [0, 0, 0, 0, 0];
    colArray.forEach(column => {
        column.forEach(word => word.classList.remove('target'));
    });
    storyDivided.forEach(part => part.textContent = '______');
});
//random story generator
surprisesBtn.addEventListener('click', function() {
    //index through each column array, get random index, set output array item to text content of random word.
    for (let i = 0; i < colArray.length; i++) {
        const randomIndex = Math.floor(Math.random() * colArray[i].length);
        outputArray[i] = colArray[i][randomIndex].textContent.slice(2);
    }
    playbackStory();
});
//function to highlight the words in the column that is currently being used in the story.
function highlightWord(columnNumber) {
    const currentColumn = colArray[columnNumber];
    //remove highlight from all words in column, then add highlight to current word based on index.
    currentColumn.forEach(word => word.classList.remove('target'));
    if(indices[columnNumber] < currentColumn.length) {
        currentColumn[indices[columnNumber]].classList.add('target');
    }
    //if index is at end of array, reset to 0 and highlight first word in column.
    else{
        currentColumn[0].classList.add('target');
    }
    
}
playbackBtn.addEventListener('click', playbackStory);
async function playbackStory() {
    /*wanted the delayed effect that the original toy had when outputting your story. 
    Tried multiple methods, eventually found a one liner from stackoverflow https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep*/

    //making sure the story is completed before letting the playback function run
    if (outputArray.includes("______")) {
        alert("Please complete the story before playing it back!");
        return;
    }
    storyDivided.forEach(part => part.textContent = '______');
    for (let i = 0; i < outputArray.length; i++) {
        
        storyDivided[i].textContent = outputArray[i];
        //little if statement here to prevent a reset from causing the readStoryAloud function to read blank words.
        if (storyDivided[i].textContent === "______") {
            return; // Don't read blank words
        }
        readStoryAloud(storyDivided[i].textContent);
        // Wait 2000ms (2 seconds) before showing the next part
        await new Promise(r => setTimeout(r, 2000));
    }
}
//learning speechsynthesis web api so it can read the story aloud like the toy does.
//https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/SpeechSynthesisUtterance
/*I'll never understand why the documentation on things is so long winded. Cut to the chase fellas, 
I shouldn't have to disect a block just to get the basic functionallity working. 
Yes there are other useful options, but all I wanted was "words go in", "robot voice comes out".*/
function readStoryAloud(word) {
    const textToSpeech = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(textToSpeech);
}
});