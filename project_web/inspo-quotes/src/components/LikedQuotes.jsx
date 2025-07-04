// components/LikedQuotes.jsx
import React from 'react';
import './LikedQuotes.css';

function LikedQuotes({ liked, onClear }) {
  return (
    <div className="liked-box">
      <h2>❤️ Liked Quotes</h2>
      {liked.length > 0 && (
        <button onClick={onClear} className="clear-btn">🗑️ Clear All</button>
      )}
      <div className="liked-list">
        {liked.map((q, i) => (
          <p key={i}>"{q.text}" — {q.author}</p>
        ))}
      </div>
    </div>
  );
}

export default LikedQuotes;
