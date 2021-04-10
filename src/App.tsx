import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UserData, checkSignedIn } from './auth';

import Header from './Header';
import Discover from './Discover';
import Gallery from './Gallery';

function App() {
  const [user, setUser] = useState(({} as unknown) as UserData);

  const signIn = (userData: UserData) => {
    setUser(userData);
  };

  useEffect(() => checkSignedIn(signIn), []);

  return (
    <div className='App'>
      <Router>
        <Header user={user}
        handleLogin={signIn}></Header>
        <div
          id='separator'
          className='w-full h-4 mb-8 bg-gradient-to-b from-gray-900 to-gray-800'
        ></div>
        <Switch>
          <Route path='/discover'>
            <Discover user={user}></Discover>
          </Route>

          <Route path='/galleries'>
            <Gallery user={user}></Gallery>
          </Route>

          <Route path='/'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
