//const { createElement } = require("react");

// STEP 1: Initialize and declare variables
const fullImg = document.querySelector(".full-img");
const displayedImg = document.querySelector(".displayed-img");
const thumbar = document.querySelector('.thumb-bar');
console.log(fullImg, displayedImg, thumbar)
/* STEP 2: Loop 5 times to create the <img> elements */
for(let i = 1; i < 6; i++){
		/* STEP 3a: Create a new DOM node - an image element */
	const bean = document.createElement("img");
		/* STEP 3b: Set the src attribute to be the path of one of the images inside the images folder, using setAttribute() */
	bean.src = `images/pic${i}.jpg`
		/* Append the new image element to the thumbBar div, named in STEP 1 */
	thumbar.append(bean);
		/* STEP 3c: Build event handler for each <img> */
	// bean.addEventListener('click', (event)=>{
	// 	changeImg(bean);
	// });
}
/* STEP 4: Function to change the src of the main <img> */
function changeImg(image){
	// Rewrite the src attribute of the .displayed-img element
	displayedImg.src = image.src;
}
/* STEP 5: Event Delegation
Instead of adding event handlers for each image, how about event delegation? Build a click handler on the parent element, and capture each target (and its attributes) from the event object */
thumbar.addEventListener('click', (event)=>{
	changeImg(event.target);
})
	// event.target is the element that was clicked

		// grab the src attribute of the element that was clicked

		// change the main image
		


// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Image_gallery and https://davidwalsh.name/event-delegate
