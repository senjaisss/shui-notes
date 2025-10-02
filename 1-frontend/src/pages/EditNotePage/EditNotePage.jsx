import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateNote, getNoteById } from '../../api/notesApi.js';

export default function EditNotePage() {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        const noteData = await getNoteById(id);
        setUsername(noteData.username);
        setText(noteData.text);
      } catch (err) {
        setError('Failed to retrieve note');
      }
    }
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !text) {
      setError('Add username and text');
      return;
    }

    try {
      await updateNote(username, id, { username, text });
      alert('Note Updated');
      navigate('/');
    } catch (err) {
      setError('Failed to update note');
    }
  };

  return (
    <div>
      <h1>Redigera note</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Användarnamn:
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} required rows={5} />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
