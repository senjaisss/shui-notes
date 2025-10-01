const BASE_URL = 'https://8g11mabu90.execute-api.eu-north-1.amazonaws.com/';

export const getNotes = async () => {
    const res = await fetch(`${BASE_URL}/allnotes`);
    if (!res.ok) throw new Error('Could not retrieve notes');
    return res.json();
}

export const getUserNotes = async (username) => {
    const res = await fetch(`${BASE_URL}/notes/${username}`);
    if (!res.ok) throw new Error('Could not retrieve user notes');
    return res.json();
}

export const postNotes = async (note) => {
    const res = await fetch(`${BASE_URL}/postnote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    });

    if (!res.ok) throw new Error('Could not post notes');
    return res.json();
}

export const updateNote = async (username, id, updates) => {
    const res = await fetch(`${BASE_URL}/notes/${username}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Could not update note');
    return res.json();
}

export const deleteNotes = async (username, id) => {
    const res = await fetch(`${BASE_URL}/notes/${username}/${id}`, {
        method: 'DELETE',
    })

    if (!res.ok) throw new Error('Could not delete note');
    return res.json();
}
