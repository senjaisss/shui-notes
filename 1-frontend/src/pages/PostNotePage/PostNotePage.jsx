import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postNotes } from '../../api/notesApi.js';

export function PostNotePage() {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !text) {
      setError('Please add username and text');
      return;
    }
    setError(null);

    try {
      const newNote = { username, text };
      await postNotes(newNote);
      alert('Note saved!');
      navigate('/');
    } catch (err) {
      setError('Failed to save note');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Skapa ny note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Användarnamn: <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Text: <br />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Publicera</button>
      </form>
    </div>
  );
}

export default PostNotePage;