import React from 'react'
import { Redirect } from 'react-router-dom'

const Login = props => {
  const { isAuthenticated } = props.auth

  return (
    <article className="mw7 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5">
      <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">Tagged!</h1>
      <h2 className="fw2 f4 lh-copy mt0 mb3">
        mark and find hidden street art in your town
      </h2>

      <div>
        {isAuthenticated() && <Redirect to="/app" />}
        <button
          className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
          onClick={e => props.auth.login()}
        >
          Login
        </button>
      </div>
    </article>
  )
}

// return (
//    <div className="pa4">
//      { isAuthenticated() && <Redirect to="/" /> }
//      <button onClick={e => props.auth.login()}>Login</button>
//    </div>
//  )

export default Login
