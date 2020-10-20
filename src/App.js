import React from 'react';
import './App.css';
import {Dog} from "./components/Dog";
import {ApolloProvider} from "@apollo/client";

function App() {
  return (
      // <ApolloProvider client={} />
    <div className="App">
      <header className="App-header">
        <p
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apollo GraphQL Test
        </p>
      </header>
        {/*<Dog></Dog>*/}
    </div>
  );
}

export default App;
