import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Discover from './Discover';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header></Header>
        <div id='separator' className='w-full h-12'></div>
        <Switch>
          <Route path='/discover'>
            <Discover></Discover>
          </Route>

          <Route path='/galleries'></Route>

          <Route path='/'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
