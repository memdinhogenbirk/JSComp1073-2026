const surprisesBtn = document.querySelector('#surprises');//randomize
const resetBtn = document.querySelector('#reset');//reset story
const playbackBtn = document.querySelector('#playback');//outputstory
const story = document.querySelector('#story');//story output
const storyDivided = document.querySelectorAll('#storyDivided h4');//divided story output
//buttons for story elements
const col1Btn = document.querySelector('#Col1btn');
const col2Btn = document.querySelector('#Col2btn');
const col3Btn = document.querySelector('#Col3btn');
const col4Btn = document.querySelector('#Col4btn');
const col5Btn = document.querySelector('#Col5btn');
const colBtnArray = [col1Btn, col2Btn, col3Btn, col4Btn, col5Btn];

//arrays for story elements
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
//forEach btn, add click listener, pass btn index in array as column number to buttonClicked function.
colBtnArray.forEach((btn, index) => {
    btn.addEventListener('click', () => buttonClicked(index));
});
function buttonClicked(columnNumber) {
    //get current array for column number (handled by forEach and passed as argument to this function).
    const currentArray = colArray[columnNumber];
    //run word highlighting function (see below)
    highlightWord(columnNumber);
    //iterate through array until length of column reached (last word/words in list).
    if (indices[columnNumber] < currentArray.length) {
        outputArray[columnNumber] = currentArray[indices[columnNumber]].textContent;
        indices[columnNumber]++;
    }
    //if index is at end of array, reset to 0 and start over.
    else {
        indices[columnNumber] = 0;
        outputArray[columnNumber] = currentArray[indices[columnNumber]].textContent;
        indices[columnNumber]++;
    }
    //console.log(outputArray);
    story.textContent = outputArray.join(' ') + '.';
}
//reset everything to default values.
resetBtn.addEventListener('click', function() {
    outputArray = ["______", "______", "______", "______", "______"];
    indices = [0, 0, 0, 0, 0];
    story.textContent = '______ ______ ______ ______ ______';
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
        outputArray[i] = colArray[i][randomIndex].textContent;
    }
    story.textContent = outputArray.join(' ') + '.';
});
//function to highlight the words in the column that is currently being used in the story.
function highlightWord(columnNumber) {
    const currentArray = colArray[columnNumber];
    //remove highlight from all words in column, then add highlight to current word based on index.
    currentArray.forEach(word => word.classList.remove('target'));
    if(indices[columnNumber] < currentArray.length) {
        currentArray[indices[columnNumber]].classList.add('target');
    }
    //if index is at end of array, reset to 0 and highlight first word in column.
    else{
        currentArray[0].classList.add('target');
    }
    
}
playbackBtn.addEventListener('click', playbackStory);
async function playbackStory() {
    //wanted the delayed effect that the original toy had when outputting your story. Tried multiple methods using setTimeout, didn't work. Found await within an async function, worked.
    //thank you stack overflow https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
    //making sure the story is completed before letting the playback function run
    if (outputArray.includes("______")) {
        alert("Please complete the story before playing it back!");
        return;
    }
    for (let i = 0; i < outputArray.length; i++) {
        storyDivided[i].textContent = outputArray[i];
        
        // Wait 2000ms (2 seconds) before showing the next part
        await new Promise(r => setTimeout(r, 2000));
    }
}
function readStoryAloud() {}