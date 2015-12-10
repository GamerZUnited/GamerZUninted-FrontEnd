import React from 'react'
import {Router, Route, Link} from 'react-router'

import Login from '../pages/Login'
import Posts from '../pages/Posts'
import Signup from '../pages/Signup'

import Home from '../pages/Home'
import NoMatch from '../pages/NoMatch'



const routes = (
  <Route>
    <Route path="/" component={Home} >

    </Route>
      <Route path="/posts" component={Posts} />
      <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />

    <Route path="*" component={NoMatch} />
  </Route>
)

export default routes
