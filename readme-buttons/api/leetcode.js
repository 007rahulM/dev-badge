import axios from 'axios';

export default async function leetcodehandler(req, res) {
  let { username, bg, text } = req.query;

  // --- 1. PREMIUM COLORS ---
  let cardBg = bg ? `#${bg}` : "#0f172a";   // Dark Slate
  let cardText = text ? `#${text}` : "#e2e8f0"; // Light Gray
  const cEasy = "#22c55e";   // Green
  const cMed = "#eab308";    // Yellow
  const cHard = "#ef4444";   // Red

  // --- 2. ROBUST DATA FETCHING ---
  let stats = { total: 0, easy: 0, medium: 0, hard: 0, isMock: true };

  if (!username) username = "rahulm2_0_0_4";
  // Clean the username
  username = username.replace("https://leetcode.com/u/", "").replace(/\/$/, "");

  try {
    // SWITCHED TO STABLE API (Heroku) to stop socket hangups
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    if (response.data.status === 'success') {
      stats.total = response.data.totalSolved;
      stats.easy = response.data.easySolved;
      stats.medium = response.data.mediumSolved;
      stats.hard = response.data.hardSolved;
      stats.isMock = false;
    }
  } catch (error) {
    console.log("API Error (Using Fallback): " + error.message);
    // Fallback data so the card never looks broken
    stats = { total: 125, easy: 40, medium: 75, hard: 10, isMock: true };
  }

  // --- 3. GENERATE PREMIUM SVG ---
  const svg = `
  <svg width="400" height="170" viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${cardBg};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#020617;stop-opacity:1" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <style>
      .text { fill: ${cardText}; font-family: 'Segoe UI', sans-serif; }
      .label { font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; opacity: 0.7; }
      .number { font-size: 14px; font-weight: 700; }
      .total-text { font-size: 36px; font-weight: 800; fill: white; }
      .username { font-size: 14px; font-weight: 600; opacity: 0.9; }
      .bar-bg { fill: ${cardText}; opacity: 0.1; }
    </style>
    
    <rect x="2" y="2" width="396" height="166" rx="16" fill="url(#gradBg)" stroke="${cardText}" stroke-width="1" stroke-opacity="0.15"/>
    
    <text x="30" y="35" class="text username">@${username}</text>
    
    <text x="30" y="85" class="text label">Total Solved</text>
    <text x="28" y="125" class="text total-text" filter="url(#glow)">${stats.total}</text>
    ${stats.isMock ? `<text x="30" y="150" class="text label" fill="#ef4444" style="font-size:9px">OFFLINE MODE</text>` : ''}

    <line x1="140" y1="30" x2="140" y2="140" stroke="${cardText}" stroke-opacity="0.1" stroke-width="1" />

    <text x="170" y="55" class="text label" fill="${cEasy}">Easy</text>
    <text x="360" y="55" class="text number" text-anchor="end">${stats.easy}</text>
    <rect x="170" y="63" width="190" height="6" rx="3" class="bar-bg" />
    <rect x="170" y="63" width="${Math.min((stats.easy/300)*190, 190)}" height="6" rx="3" fill="${cEasy}" filter="url(#glow)" />

    <text x="170" y="90" class="text label" fill="${cMed}">Medium</text>
    <text x="360" y="90" class="text number" text-anchor="end">${stats.medium}</text>
    <rect x="170" y="98" width="190" height="6" rx="3" class="bar-bg" />
    <rect x="170" y="98" width="${Math.min((stats.medium/300)*190, 190)}" height="6" rx="3" fill="${cMed}" filter="url(#glow)" />

    <text x="170" y="125" class="text label" fill="${cHard}">Hard</text>
    <text x="360" y="125" class="text number" text-anchor="end">${stats.hard}</text>
    <rect x="170" y="133" width="190" height="6" rx="3" class="bar-bg" />
    <rect x="170" y="133" width="${Math.min((stats.hard/100)*190, 190)}" height="6" rx="3" fill="${cHard}" filter="url(#glow)" />
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=60"); 
  res.status(200).send(svg);
}