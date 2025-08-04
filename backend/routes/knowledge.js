const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.join(__dirname, '../knowledge');

// Simple search: returns sections containing the query
router.get('/search', async (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.status(400).json({ error: 'Query required' });

  try {
    const files = fs.readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'));
    let results = [];
    for (const file of files) {
      const content = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), 'utf-8');
      const sections = content.split(/\n## /).map(s => s.trim());
      for (const section of sections) {
        if (section.toLowerCase().includes(query)) {
          results.push({ file, section });
        }
      }
    }
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Knowledge search failed', details: err.message });
  }
});

module.exports = router;
