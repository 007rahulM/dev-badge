DEVBADGE
Developer Profile Generator
===========================

DevBadge is a dashboard for developers to enhance their GitHub Profile READMEs.
It allows you to generate Call-to-Action buttons and live LeetCode stats cards
that can be embedded directly into Markdown files.

Live Website:
https://dev-badge-phi.vercel.app


OVERVIEW
--------

DevBadge is a SaaS-like tool designed to help developers showcase achievements
and drive traffic from their GitHub profiles.

It provides two generators:

1) LeetCode Stats Card
   - Real-time solved problem counts (Easy / Medium / Hard)
   - Cyberpunk-style UI with glassmorphism
   - Custom background and text colors
   - Fast loading with smart caching

2) SVG Button Generator
   - Gradient buttons for Portfolio, Resume, Live Projects
   - Copy-paste ready output
   - Live preview before use


KEY FEATURES
------------

LeetCode Stats Card
- Fetches live data from LeetCode
- Dark / neon visual style
- Fully customizable colors
- Optimized performance

SVG Button Generator
- Gradient color support
- Markdown-ready output
- Instant preview


HOW TO USE
----------

Method 1: Dashboard (Recommended)

1. Visit https://dev-badge-phi.vercel.app
2. Choose Button or LeetCode
3. Enter required details (username, text, etc.)
4. Select colors
5. Click "Copy Code"
6. Paste into your GitHub Profile README


Method 2: Manual API Usage

LeetCode Stats Card Example
Replace the username with your own.

URL:
https://dev-badge-phi.vercel.app/api/leetcode?username=YOUR_USERNAME&bg=0f172a&text=e2e8f0

LeetCode Profile:
https://leetcode.com/YOUR_USERNAME


Custom Button Example

URL:
https://dev-badge-phi.vercel.app/api/index?text=Live%20Website&color1=E96443&color2=904E95

Target Link:
https://dev-badge-phi.vercel.app


TECH STACK
----------

Frontend:
- React.js
- Vite

Backend:
- Node.js
- Express (Serverless Functions)

Styling:
- CSS3
- Glassmorphism
- CSS Variables

HTTP Client:
- Axios

Deployment:
- Vercel


AUTHOR
------

Built with love by Rahul

GitHub:
https://github.com/007rahulM

Project Link:
https://dev-badge-phi.vercel.app


NOTE
----

If you found this project useful, consider starring the repository on GitHub.
Your support helps the project grow.
