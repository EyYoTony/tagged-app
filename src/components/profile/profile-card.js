import React from 'react'

const ProfileCard = confirmLogOut => profile => {
  return (
    <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
      <div className="tc">
        <img
          src={profile.picture}
          className="br-100 h4 w4 dib ba b--black-05 pa2"
          title="placeholder avatar"
        />
        <h1 className="f3 mb2">
          {profile.nickname}
        </h1>
        <h2 className="f5 fw4 gray mt0">
          {profile.name}
        </h2>
        <a
          className="f6 tc link mt1 db br1 bw2 ph3 pv2 mb2 white bg-dark-green hover-bg-green"
          href="#0"
        >
          Edit Profile
        </a>
        <a
          className="f6 tc link mt1 db br1 bw2 ph3 pv2 mb2 white bg-red hover-bg-dark-red"
          onClick={confirmLogOut}
          href="/"
        >
          Log Out
        </a>
      </div>
    </article>
  )
}

export default ProfileCard
