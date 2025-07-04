import React from 'react';
import './QuoteBox.css';

function QuoteBox({ quote, onLike, onCopy }) {
  return (
    <div className="quote-box fade-in">
      <p className="quote-text">"{quote.text}"</p>
      <p className="quote-author">— {quote.author}</p>
      <p className="quote-tag">#{quote.tag}</p>
      <div className="btn-group">
        <button onClick={() => onLike(quote)} className="like-btn">❤️ Like</button>
        <button onClick={onCopy} className="copy-btn">📋 Copy</button>
      </div>
    </div>
  );
}

export default QuoteBox;
