async function startProgram() {
    // 60 cm heading 0
    // heading 90, 60cm
    // heading 0, 30cm
    // heading 270(-90), 30cm
    // heading 0, 30cm
    // heading -90, 30cm
    // heading 0, 60cm
    // heading 90, 30cm
    //heading 0, 30cm
    let speed = 20;
    await rollToDistance(0, speed, 60);
    await rollToDistance(90, speed, 60);
    await rollToDistance(0, speed, 30);
    await rollToDistance(-90, speed, 30);
    await rollToDistance(0, speed, 30);
    await rollToDistance(-90, speed, 30);
    await rollToDistance(0, speed, 60);
    await rollToDistance(90, speed, 30);
    await rollToDistance(0, speed, 30);
    await speak("are you proud of me dad?", true);
    exitProgram();
};