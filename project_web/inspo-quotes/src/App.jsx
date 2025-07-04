import React, { useState, useEffect } from 'react';
import QuoteBox from './components/QuoteBox';
import LikedQuotes from './components/LikedQuotes';
import './App.css';

const allQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", tag: "Motivation" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", tag: "Inspiration" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs", tag: "Wisdom" },
];

function App() {
  const [quote, setQuote] = useState(allQuotes[0]);
  const [likedQuotes, setLikedQuotes] = useState(() => JSON.parse(localStorage.getItem("likedQuotes")) || []);
  const [darkMode, setDarkMode] = useState(false);

  const getRandomQuote = () => {
    const random = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    setQuote(random);
  };

  const likeQuote = (quote) => {
    if (!likedQuotes.find((q) => q.text === quote.text)) {
      const updated = [...likedQuotes, quote];
      setLikedQuotes(updated);
    }
  };

  const clearLikedQuotes = () => {
    setLikedQuotes([]);
    localStorage.removeItem("likedQuotes");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    alert("Quote copied to clipboard!");
  };

  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="title">InspoQuotes</h1>

      <QuoteBox quote={quote} onLike={likeQuote} onCopy={copyQuote} />

      <button onClick={getRandomQuote} className="new-quote-btn">🔁 New Quote</button>

      <LikedQuotes liked={likedQuotes} onClear={clearLikedQuotes} />
    </div>
  );
}

export default App;
