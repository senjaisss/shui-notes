export function validateUpdateNote(body, username, id) {
  if (!username || typeof username !== 'string' || username.length === 0 || username.length > 10) {
    return { valid: false, message: 'Invalid username in path parameter' };
  }
  
  if (!id || typeof id !== 'string' || id.length === 0) {
    return { valid: false, message: 'Invalid id in path parameter' };
  }

  if (!body || typeof body.text !== 'string' || body.text.length === 0) {
    return { valid: false, message: 'Text is required' };
  }
  
  if (body.text.length > 300) {
    return { valid: false, message: 'Text cannot be longer than 300 characters' };
  }

  return { valid: true };
}