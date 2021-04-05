import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Discover from './Discover';
import Gallery from './Gallery';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header></Header>
        <div id='separator' className='w-full h-4 mb-8 bg-gradient-to-b from-gray-900 to-gray-800'
        ></div>
        <Switch>
          <Route path='/discover'>
            <Discover></Discover>
          </Route>

          <Route path='/galleries'>
            <Gallery></Gallery>
          </Route>

          <Route path='/'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
