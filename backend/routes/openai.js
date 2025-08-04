const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/openai/chat
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI request failed', details: err.message });
  }
});

module.exports = router;
