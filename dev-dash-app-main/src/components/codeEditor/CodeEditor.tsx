// components/CodeEditor.tsx
import  { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import './style.css'

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here');
  const [snippets, setSnippets] = useState<any[]>([]);

  // Load saved snippets
  useEffect(() => {
    const saved = localStorage.getItem('devdash-snippets');
    if (saved) setSnippets(JSON.parse(saved));
  }, []);

  // Save snippet
  const saveSnippet = () => {
    const newSnippet = { id: Date.now(), language, code };
    const updatedSnippets = [...snippets, newSnippet];
    setSnippets(updatedSnippets);
    localStorage.setItem('devdash-snippets', JSON.stringify(updatedSnippets));
  };

  //clear snippet
  const clearSnippets = () => {
  setSnippets([]);
  localStorage.removeItem('devdash-snippets');
};


  // Highlight
  const highlight = (code: string) => {
    return Prism.highlight(code, Prism.languages[language], language);
  };

  return (
     <div className='editor-widget-parent'>
      <div className="editor-widget">
 <div className="code-editor-wrapper">
  <div className="editor-toolbar">
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="editor-select"
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      {/* Add more */}
    </select>
    <button onClick={saveSnippet} className="save-button">
      💾 Save Snippet
    </button>
    
  <button onClick={clearSnippets} className="save-button">
    🗑️ Clear All
  </button>
  </div>

  <Editor
    value={code}
    onValueChange={setCode}
    highlight={highlight}
    padding={10}
    style={{
      backgroundColor: '#2d2d2d',
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
      minHeight: '200px',
    }}
  />

  <div className="saved-snippets">
    <h2 className="saved-snippets-title">📚 Saved Snippets</h2>
    {snippets.map((snip) => (
      <div key={snip.id} className="snippet-card">
        <strong className="snippet-language">{snip.language.toUpperCase()}</strong>
        <pre className="snippet-code">{snip.code}</pre>
      </div>
    ))}
  </div>
</div>

    </div>
    </div>
  );
};

export default CodeEditor;
