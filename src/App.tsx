import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/"></Route>

          <Route path="/discover">
            
          </Route>

          <Route path="/galleries"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
