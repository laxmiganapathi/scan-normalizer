const express = require('express');
const bodyParser = require('body-parser');
const { normalize } = require('./services/normalize.service');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.post('/normalize/:tool', async (req, res) => {
  const tool = req.params.tool;
  try {
    const normalized = normalize(tool, req.body);
    res.json({ tool, count: normalized.length, vulnerabilities: normalized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log(`Normalization service running on http://localhost:3000`));