// HELPER: Available API Endpoints
// Base URL: https://georgian.polaristechservices.com

/* CLAUDE API ENDPOINTS */
// 1. POST /api/claude/messages - Send message to Claude
//    Headers: X-Student-API-Key: your_student_id, Content-Type: application/json
//    Body: { model: "claude-3-5-sonnet-20241022", max_tokens: 100, messages: [{ role: "user", content: "your message" }] }
//    Response: { content: [{ text: "Claude's response" }], usage: { input_tokens: 10, output_tokens: 20 } }

// 2. GET /api/claude/status - Check token usage
//    Headers: X-Student-API-Key: your_student_id
//    Response: { student_id: "12345", student_name: "John Doe", tokens_used: 500, tokens_allocated: 10000, tokens_remaining: 9500, is_enabled: true }

// STEP 1: Store the API configuration
// STEP 2: Set the base URL for the Claude API
const baseURL = "https://georgian.polaristechservices.com";
// STEP 3: Set your student API key (student ID)
const studentApiKey = "200340292";
// STEP 4: Set the maximum tokens for API requests
const maxTokens = 1000;

/* STEP 5: Reference the DOM elements you'll need to access */
const userMessage = document.querySelector("#user-message");
const sendMessageBtn = document.querySelector("#send-message");
const checkUsageBtn = document.querySelector("#check-usage");
const results = document.querySelector("#results");
const usage = document.querySelector("#usage");

//***************************************************LAB addition*****************************************/
const conversationHistory = [];

/* STEP 6: Add event listeners for all interactive elements */
// STEP 6a: Send message button
sendMessageBtn.addEventListener("click", sendChatMessage);

// STEP 6b: Check usage button
checkUsageBtn.addEventListener("click", checkTokenUsage);

/* STEP 7: Create the checkTokenUsage function */
function checkTokenUsage(){
    // STEP 7a: Create complete url
    const url = `${baseURL}/api/claude/status`;
    // STEP 7b: Request status from the API
    fetch(url,{
        headers: {
            "X-Student-API-Key": studentApiKey
        }
    })
    // STEP 7c: Handle the response
    .then(response=>{
        return response.json();
    })
    // STEP 7d: Display to user
    .then(json=>{
        displayStatus(json);
    })
    
};
function displayStatus(json){
    console.log(json);
    usage.textContent = "Tokens used: " + json.tokens_used 
    + " Remaining: " + json.tokens_remaining;
}
/* STEP 8: Create the sendChatMessage function for Claude API interaction */
function sendChatMessage(){
// STEP 8a: Get form values
    let userInput = userMessage.value;
    //***************************************************LAB addition*****************************************/
    conversationHistory.push({//add user message as object to conversationHistory
        role: "user",
        content: userInput
    });

  userMessage.value = "";//clear input
// STEP 8b: Create complete url
    let url = `${baseURL}/api/claude/messages`;
// STEP 8c: Prepare the request body according to Claude API format
    let body = {
        "model": "claude-sonnet-5", 
        "max_tokens": maxTokens, 
        "messages": conversationHistory//********************************************LAB addition*****************************************/
    }
    console.log("Request body:", body); // Log the request body for debugging
// STEP 8d: Make the API request using fetch()
    fetch(url, {
        method: "POST",
        headers: {
            "X-Student-API-Key": studentApiKey,
            "Content-Type": "application/json"
        },
        body : JSON.stringify(body)
    })
    // STEP 8e: Handle the response
    .then(response=>{
        return response.json();
    })
    .then(json=>{
        //***************************************************LAB addition*****************************************/
        const claudeReply = json.content[0].text;
        conversationHistory.push({//add Claude response as object to conversationHistory
            role: "assistant",
            content: claudeReply
        });
        //***************************************************LAB addition*****************************************/
        displayConversation();
    })
}
// STEP 8f: Extract the message content from Claude's response
function displayMessage(json){
    console.log(json);
    let para = document.createElement("p");
    //***************************************************LAB addition*****************************************/
    for (let i = 0; i < conversationHistory.length; i++) {
        let message = conversationHistory[i];
        let messagePara = document.createElement("p");
        messagePara.textContent = `${message.role}: ${message.content}`;
        results.appendChild(messagePara);
    }
    let assistantPara = document.createElement("p");
    assistantPara.textContent = "Claude: " + savedResponses[i];
    results.appendChild(assistantPara);
}

// LAB EXTENSION: Multi-Message Chat Feature
// After completing the basic implementation, extend the functionality to support conversation history:

/* LAB STEP 1: Modify sendChatMessage to use conversation history */
// - Add the user's message to conversationHistory
// - Send the entire conversation to the API instead of just the current message
// - Add Claude's response to conversationHistory
//***************************************************LAB addition*****************************************/
function displayConversation() {
    results.innerHTML = "";
    conversationHistory.forEach(msg => {
        const p = document.createElement("p");
        if (msg.role === "user") {
            p.textContent = "You: " + msg.content;
            p.style.fontWeight = "bold";
        } else {
            p.textContent = "Claude: " + msg.content;
        }
        results.appendChild(p);
    });
}
/* LAB STEP 2: Update the displayResult function for chat-like appearance */
// - Show messages in a conversation format
// - Display user and Claude messages differently
// - Show conversation flow clearly
/*[
  {"role": "user", "content": "Hello there."},
  {"role": "assistant", "content": "Hi, I'm Claude. How can I help you?"},
  {"role": "user", "content": "Can you explain LLMs in plain English?"},
] */