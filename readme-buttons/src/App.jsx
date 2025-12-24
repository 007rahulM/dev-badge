import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('button');

  // --- BUTTON STATE ---
  const [text, setText] = useState('Download CV');
  const [color1, setColor1] = useState('#E96443');
  const [color2, setColor2] = useState('#904E95');
  const [link, setLink] = useState('');

  // --- LEETCODE STATE ---
  const [lcUsername, setLcUsername] = useState('rahulm2_0_0_4');
  const [lcBgColor, setLcBgColor] = useState('#0f172a'); 
  const [lcTextColor, setLcTextColor] = useState('#e2e8f0');
  
  // DEBOUNCED STATE (This is the fix!)
  // We only update this state when you STOP typing/dragging
  const [debouncedUrl, setDebouncedUrl] = useState('');

  // --- CONFIGURATION ---
  const PREVIEW_HOST = "http://localhost:3000";
  const LIVE_HOST = "https://readme-buttons.vercel.app";

  // --- EFFECT: Handle Debounce ---
  useEffect(() => {
    // Create the URL based on current inputs
    const lcBg = lcBgColor.replace('#', '');
    const lcTxt = lcTextColor.replace('#', '');
    const url = `${PREVIEW_HOST}/api/leetcode?username=${lcUsername}&bg=${lcBg}&text=${lcTxt}`;

    // Wait 500ms before setting the URL
    const handler = setTimeout(() => {
      setDebouncedUrl(url);
    }, 500);

    return () => clearTimeout(handler); // Cleanup if user types again
  }, [lcUsername, lcBgColor, lcTextColor]);

  // --- LOGIC: Button ---
  const c1 = color1.replace('#', '');
  const c2 = color2.replace('#', '');
  const btnLiveUrl = `${LIVE_HOST}/api/index?text=${encodeURIComponent(text)}&color1=${c1}&color2=${c2}`;
  const btnPreviewUrl = `/api/index?text=${encodeURIComponent(text)}&color1=${c1}&color2=${c2}`;
  const btnMarkdown = `[![${text}](${btnLiveUrl})](${link || "#"})`;

  // --- LOGIC: LeetCode (Markdown generation) ---
  const lcBg = lcBgColor.replace('#', '');
  const lcTxt = lcTextColor.replace('#', '');
  const lcLiveUrl = `${LIVE_HOST}/api/leetcode?username=${lcUsername}&bg=${lcBg}&text=${lcTxt}`; 
  const lcMarkdown = `[![LeetCode Stats](${lcLiveUrl})](https://leetcode.com/${lcUsername})`;

  return (
    <div className="app-container">
      <h1>Developer Dashboard</h1>

      <div className="tab-container">
        <button className={`tab-btn ${activeTab === 'button' ? 'active' : ''}`} onClick={() => setActiveTab('button')}>
          Button Generator
        </button>
        <button className={`tab-btn ${activeTab === 'leetcode' ? 'active' : ''}`} onClick={() => setActiveTab('leetcode')}>
          LeetCode Stats
        </button>
      </div>

      <div className="card-glass">
        
        {/* === TAB 1: BUTTON === */}
        {activeTab === 'button' && (
          <>
            <div className="controls-grid">
              <div className="input-group"><label>Text</label><input type="text" value={text} onChange={(e) => setText(e.target.value)} /></div>
              <div className="input-group"><label>Link</label><input type="text" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} /></div>
              <div className="input-group"><label>Color 1</label><div className="color-wrapper"><input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} /><span>{color1}</span></div></div>
              <div className="input-group"><label>Color 2</label><div className="color-wrapper"><input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} /><span>{color2}</span></div></div>
            </div>

            <div className="preview-container">
              <label>Preview</label>
              <div className="preview-box">
                <img src={btnPreviewUrl} alt="Preview" />
              </div>
            </div>

            <div className="input-group" style={{marginTop: '30px'}}>
              <div className="code-block">{btnMarkdown}</div>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(btnMarkdown)}>Copy Code</button>
            </div>
          </>
        )}

        {/* === TAB 2: LEETCODE === */}
        {activeTab === 'leetcode' && (
          <>
            <div className="controls-grid">
              <div className="input-group">
                <label>Username</label>
                <input type="text" value={lcUsername} onChange={(e) => setLcUsername(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Card Background</label>
                <div className="color-wrapper"><input type="color" value={lcBgColor} onChange={(e) => setLcBgColor(e.target.value)} /><span>{lcBgColor}</span></div>
              </div>
              <div className="input-group">
                <label>Text Color</label>
                <div className="color-wrapper"><input type="color" value={lcTextColor} onChange={(e) => setLcTextColor(e.target.value)} /><span>{lcTextColor}</span></div>
              </div>
            </div>

            <div className="preview-container">
              <label>Card Preview (Stable)</label>
              <div className="preview-box">
                {/* We use 'debouncedUrl' instead of the raw URL.
                   This prevents the flashing/crashing when you drag colors.
                */}
                {debouncedUrl && (
                  <img 
                    src={debouncedUrl} 
                    alt="LeetCode Stats" 
                    style={{maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'}} 
                  />
                )}
              </div>
            </div>

            <div className="input-group" style={{marginTop: '30px'}}>
              <label>Copy Markdown (For GitHub)</label>
              <div className="code-block">{lcMarkdown}</div>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(lcMarkdown)}>Copy Code</button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default App