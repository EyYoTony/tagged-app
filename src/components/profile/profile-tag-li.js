import React from 'react'
//import { Link } from 'react-router-dom'

const ProfileTagLi = tagObj => {
  return (
    <article className="link dt w-100 bb b--black-10 pb2 mt2 blue">
      <div className="dtc">
        <img src={tagObj.photo} className="br-100 w4 h4 mr4" alt="tag photo" />
      </div>
      <div className="dtc v-mid pl2">
        <h1 className="f6 f5-ns fw6 lh-title black mv0">
          {tagObj.artTitle}
        </h1>
        <h2 className="f6 fw4 mt2 mb0 black-60">
          {tagObj.artist}
        </h2>
        <dl className="mt2 f6">
          <dt className="clip">Distance</dt>
          <dd className="ml0">5 mi.</dd>
        </dl>
      </div>
      <div className="dtc v-mid pl2">
        <a
          className="f5 tc br1 link ml4 db br1 bw2 ph3 pv3 mb2 white bg-dark-green hover-bg-green"
          href="#0"
        >
          Edit
        </a>
        <a
          className="f5 tc br1 link ml4 db br1 bw2 ph3 pv3 mb2 white bg-red hover-bg-dark-red"
          onClick={e =>
            fetch(`http://localhost:5000/tags/${tagObj._id}`, {
              method: 'DELETE'
            })}
          href="/profile/"
        >
          Delete
        </a>
      </div>
    </article>
  )
}

export default ProfileTagLi
