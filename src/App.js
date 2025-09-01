import React from 'react';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const sampleUser = {
    role: 'Software Engineer',
    bio: 'Passionate developer with expertise in React and modern web technologies.',
    email: 'john.doe@techcorp.com',
    location: 'San Francisco, CA'
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TechCorp Assessment</h1>
        <p>Enhance the UserProfile component below</p>
      </header>
      <main>
        <UserProfile user={sampleUser} />
      </main>
    </div>
  );
}

export default App;
