import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import DiscoverMap from './Map';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/discover">
            <DiscoverMap></DiscoverMap>
          </Route>

          <Route path="/galleries"></Route>

          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
