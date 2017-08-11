import React from 'react'
import { Link } from 'react-router-dom'
import Ionicon from 'react-ionicons'

const FormHeader = props => {
  return (
    <header className="flex flex-row justify-between items-center bg-dark-green h3 b f3 fw6 pa3 mb2">
      <div>
        <Link to="/profile/">
          <Ionicon icon="ion-arrow-return-left" fontSize="35px" />
        </Link>
      </div>
      <div>Tagged!</div>
      <div><Ionicon fontSize="35px" /></div>
    </header>
  )
}

export default FormHeader
