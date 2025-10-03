export function validateNote(note) {
  if (!note) {
    return { valid: false, message: "Note data is required" };
  }

  if (typeof note.username !== 'string' || note.username.length === 0) {
    return { valid: false, message: "Username must be added" };
  }

  if (note.username.length > 10) {
    return { valid: false, message: "Username cannot be longer than 10 characters" };
  }

  if (typeof note.text !== 'string' || note.text.length === 0) {
    return { valid: false, message: "Text is required" };
  }

  if (note.text.length > 300) {
    return { valid: false, message: "Text cannot be longer than 300 characters" };
  }

  return { valid: true };
}