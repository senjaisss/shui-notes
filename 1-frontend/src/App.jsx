import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('https://8g11mabu90.execute-api.eu-north-1.amazonaws.com/allnotes')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Test av API-anrop</h1>
      <p>Se konsolen för resultatet av fetch-anropet</p>
    </div>
  );
}

export default App;

