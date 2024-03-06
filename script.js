// Function to send user message and display response
/* 
async function sendMessage() {
    // Get user input
    var userInput = document.getElementById("user-input").value;
    
    // Display user message in the chatbox
    displayMessage("You", userInput);

    try {
        // Configure genai with your API key
        genai.configure({ api_key: 'YOUR_API_KEY_HERE' });

        // Create a GenerativeModel object
        const model = genai.GenerativeModel('gemini-pro');

        // Generate content based on user input
        const response = await model.generateContent(userInput);

        // Extract the generated text from the response
        var botResponse = response.text;

        // Display chatbot response in the chatbox
        displayMessage("Chatbot", botResponse);
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }

    // Clear user input field
    document.getElementById("user-input").value = "";
}

// Function to display messages in the chatbox
function displayMessage(sender, message) {
    var chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<p><strong>" + sender + ":</strong> " + message + "</p>";
    // Scroll to bottom of chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
*/

// Function to send user message and display response
async function sendMessage() {
    // Get user input
    var userInput = document.getElementById("user-input").value;
    
    // Display user message in the chatbox
    displayMessage("You", userInput);

    try {
        // Make a POST request to the server with user input
        const response = await fetch('https://botchatserver.netlify.app/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: userInput })
        });

        // Parse the JSON response
        const data = await response.json();

        // Extract the bot response from the server response
        const botResponse = data.response;

        // Display chatbot response in the chatbox
        displayMessage("Chatbot", botResponse);
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }

    // Clear user input field
    document.getElementById("user-input").value = "";
}

// Function to display messages in the chatbox
function displayMessage(sender, message) {
    var chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<p><strong>" + sender + ":</strong> " + message + "</p>";
    // Scroll to bottom of chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}


