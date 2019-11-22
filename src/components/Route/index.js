import React from 'react';
import { Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

export default props => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/home">Home</Link>|<Link to="/about">About</Link>
      </div>

      <Route exact path="/home" component={loadable(() => import('../Home'))} />
      <Route exact path="/about" component={loadable(() => import('../About'))} />
      <Redirect to='/home' />
    </BrowserRouter>
  );
};
