import React from 'react'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'

const MainHeader = props => {
  return (
    <header className="flex flex-row justify-between items-center bg-dark-green h3 b f3 fw6 pa3 mb2">
      <div>
        <Ionicon fontSize="35px" />
      </div>
      <div>Tagged!</div>
      <div className="pa4 tc">
        <Link to="/profile/">
          <img
            src={props.profile.picture}
            className="br2 h2 w2 dib"
            alt="avatar placeholder"
          />
        </Link>
      </div>
    </header>
  )
}

export default MainHeader
