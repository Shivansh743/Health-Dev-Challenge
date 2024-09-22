const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Process the data
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercaseAlphabet = alphabets
    .filter(char => char.length === 1 && char.toLowerCase() === char)
    .sort((a, b) => b.localeCompare(a))[0] || [];

  // Process the file (simplified for this example)
  const fileValid = !!file_b64;
  const fileMimeType = fileValid ? 'application/octet-stream' : undefined;
  const fileSizeKb = fileValid ? Math.round(file_b64.length * 0.75 / 1024) : undefined;

  const response = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with actual user_id logic
    email: "john@xyz.com", // Replace with actual email logic
    roll_number: "ABCD123", // Replace with actual roll number logic
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  };

  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});