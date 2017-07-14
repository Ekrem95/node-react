import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Index from './components/Index';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import Add from './components/Add';
import AddFile from './components/AddFile';
import Details from './components/Details';
import Edit from './components/Edit';
import Password from './components/Password';
import NotFound from './components/NotFound';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/add/file" component={AddFile} />
            <Route path="/p/d/:id" component={Details} />
            <Route path="/p/:id" component={Edit} />
            <Route path="/changepassword" component={Password} />
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
