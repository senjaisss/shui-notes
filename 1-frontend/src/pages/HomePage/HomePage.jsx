import { getNotes } from "../../api/notesApi.js";
import { useState, useEffect } from "react";
import './homePage.css';
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const goToPostNote = () => {
        navigate('/postnote');
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getNotes();
            setNotes(data.notes);
            setUsername(data.username);
            console.log(data)
        }
        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {notes && notes.map((note) => (
                    <li key={note.id} className="note-item" onClick={() => navigate(`/editnote/${note.id}`)}>
                        {new Date(note.createdAt).toLocaleDateString('sv-SE', {
                            day: 'numeric',
                            month: 'short',
                        }).replace('.', '')}
                        {' '}
                        {new Date(note.createdAt).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                        {note.username}
                        {note.text}</li>
                ))}
            </ul>
            <div>
                <button onClick={goToPostNote}> ny note knapp</button>
            </div>
        </div>
    );
}

export default HomePage;