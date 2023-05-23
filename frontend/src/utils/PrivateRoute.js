import React from 'react'
import { Route, redirect } from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {

    const authenticated = false;

  return (
    <Route {...rest}>{!authenticated ? redirect("/") : children}</Route>
  )
}

export default PrivateRoute