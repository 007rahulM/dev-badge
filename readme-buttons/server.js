// server.js
import express from 'express';
import buttonHandler from './api/index.js';      // Import Button logic
import leetcodeHandler from './api/leetcode.js'; // Import LeetCode logic <-- NEW

const app = express();

// 1. Route for Buttons
app.get('/api/index', (req, res) => {
  buttonHandler(req, res);
});

// 2. Route for LeetCode (THIS WAS MISSING)
app.get('/api/leetcode', (req, res) => {
  leetcodeHandler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  console.log(`- Test Button:   http://localhost:${PORT}/api/index?text=Test`);
  console.log(`- Test LeetCode: http://localhost:${PORT}/api/leetcode?username=rahulm2_0_0_4`);
});