// STEP 1: Build the main entry point for the program
async function startProgram(){
    // STEP 2: Call a method to control the main LED lights
    setMainLed({r: 0, g:0, b: 255});
    // STEP 3: Invoke another method to write to the screen
    await scrollMatrixText("BEANS!", { r: 0, g: 0, b: 255 }, 60, true);
    // STEP 3: Call another method to move the robot
    await roll(0, 30, 3);
    // STEP 4: Exit the program
    exitProgram;

// STEP 5: Aim your robot, then run the program
}