import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AppPage from './pages/app-page'
import Profile from './pages/profile'

// import Auth from './auth'
import history from './history'

// const auth = Auth()
//
// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication()
//   }
// }

const App = () => {
  return (
    <BrowserRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={AppPage} />
          <Route exact path="/profile/" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

// <Route exact path="/" render={(props) => <Login auth={auth} {...props} />} />
// <Route path="/callback" render={(props) => {
//   handleAuthentication(props);
//   return <Callback {...props} />
// }} />

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     auth.isAuthenticated() ? (
//       <Component auth={auth} {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

export default App
