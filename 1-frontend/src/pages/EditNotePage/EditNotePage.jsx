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
                const res = await getNoteById(id);
                setUsername(res.note?.username || '');
                setText(res.note?.text || '');
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
        <>
            <header className="app-header">
                <h1>SHUI notes</h1>
            </header>
            <h1 className="title">edit your new note:</h1>
            <div className="postnote-container">
                <div>
                    <form className="postnote-form" onSubmit={handleSubmit}>
                        <label>
                            username: <br />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <div>
                            <label>
                                Text: <br />
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    rows={5}
                                />
                            </label>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit">Save changes</button>
                    </form>
                </div>
            </div>
        </>
    );
}