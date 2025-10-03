import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postNotes } from '../../api/notesApi.js';
import './postNotePage.css';

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
    <>
      <header className="app-header">
        <h1>SHUI notes</h1>
      </header>
      <h1 className="title">write your new note:</h1>
      <div className="postnote-container">
        <div>
          <form className="postnote-form" onSubmit={handleSubmit}>
            <label>
              username: <br />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <div>
              <label>
                note: <br />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={5}
                  required
                />
              </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">post!</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostNotePage;