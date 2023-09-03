const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000;
const timeout = 500;

app.use(express.json());

const fetchurl = async (url) => {
  try {
    const response = await axios.get(url, { timeout: timeout });
    if (response.status === 200) {
      return response.data.numbers || [];
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
  }
  return [];
};

app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  let numbers = [];

  try {
    const promises = urls.map(fetchurl);
    const results = await Promise.all(promises);

    for (const result of results) {
      numbers = numbers.concat(result);
    }

    const uniqueNumbers = [...new Set(numbers)];
    uniqueNumbers.sort((a, b) => a - b);

    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error(`Error processing numbers: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`number-management-service is listening on port ${port}`);
});