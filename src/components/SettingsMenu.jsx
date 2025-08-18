import React, { useState } from "react";

const SettingsMenu = () => {
  const [volume, setVolume] = useState(50);
  const [difficulty, setDifficulty] = useState("Normal");
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="settings-menu" style={{ padding: "2rem", maxWidth: 400 }}>
      <h2>Settings</h2>
      <div>
        <label>
          Volume: {volume}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Difficulty:
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={fullscreen}
            onChange={e => setFullscreen(e.target.checked)}
          />
          Enable Fullscreen
        </label>
      </div>
    </div>
  );
};

export default SettingsMenu;