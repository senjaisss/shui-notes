import { getNotes } from "../../api/notesApi.js";
import { useState, useEffect } from "react";
import './homePage.css';
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const [notes, setNotes] = useState([]);
    const [username, setUsername] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const navigate = useNavigate();

    const goToPostNote = () => {
        navigate('/postnote');
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getNotes();
            setNotes(data.notes);
            setFilteredNotes(data.notes);
            setUsername(data.username);
            console.log(data)
        }
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        if (!value) {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter(note => {
                const dateStr = new Date(note.createdAt)
                    .toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
                    .replace('.', '')
                    .toLowerCase();
                return (
                    note.username.toLowerCase().includes(value) ||
                    note.text.toLowerCase().includes(value) ||
                    dateStr.includes(value)
                );
            });
            setFilteredNotes(filtered);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by date or username..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredNotes.map(note => (
                    <li
                        key={note.id}
                        onClick={() => navigate(`/editnote/${note.id}`)}
                    >
                        {new Date(note.createdAt).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }).replace('.', '')}
                        {' '}
                        {new Date(note.createdAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                        {' '}
                        {note.username}: {note.text}
                    </li>
                ))}
            </ul>
            <button onClick={goToPostNote}>Write new note</button>
        </div>
    );
}

export default HomePage;