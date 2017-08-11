import React from 'react'

const MainHeader = props => {
  return (
    <header className="flex flex-row justify-between items-center bg-dark-green h3 b f3 fw6 pa3 mb2">
      <div>{''}</div>
      <div>Tagged!</div>
      <div className="pa4 tc">
        <img
          src={
            'http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg'
          }
          className="br2 h2 w2 dib"
          alt="avatar placeholder"
        />
      </div>
    </header>
  )
}

export default MainHeader
