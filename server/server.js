const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Specify the directory containing static files (client directory inside ChatBot)
const staticFilesDirectory = path.join(__dirname, 'ChatBot', 'client');

// Configure Express to serve static files from the specified directory
app.use(express.static(staticFilesDirectory));

app.use(express.json());

// Endpoint to handle API requests
app.post('/api/openai', async (req, res) => {
    try {
        const userInput = req.body.input;

        // Make a request to the OpenAI API text completions endpoint
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Model ID for text completion
                prompt: userInput,
                max_tokens: 50 // Maximum number of tokens for the completion
            })
        });

        const data = await response.json();

        // Extract the generated text from the API response
        const botResponse = data.choices[0].text.trim();

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
