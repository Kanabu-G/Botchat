const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userInput = req.body.input;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text:completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GOOGLE_API_KEY}`
      },
      body: JSON.stringify({
        prompt: userInput,
        maxOutputTokens: 150, // Adjust as needed
        temperature: 0.7, // Adjust as needed
        model: 'text-bison-001' // Google's Generative AI model
      })
    });

    const data = await response.json();
    const botResponse = data.result.join('');
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});