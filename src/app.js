import React from 'react';

function App() {
  return (
    <div>
      <h1 style={{ color: 'green', textAlign: 'center' }}>
        Welcome to the POC-10 Java Web Application!
      </h1>
      <h2 style={{ color: 'brown', textAlign: 'center' }}>
        Code is pushed to GitHub, then Jenkins builds and analyzes it using SonarQube.
      </h2>
      <h3 style={{ color: 'black', textAlign: 'center' }}>
        The application is containerized with Docker and deployed for end-user access.
      </h3>
    </div>
  );
}

export default App;
