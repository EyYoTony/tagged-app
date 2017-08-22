import React from 'react'
//import { Link } from 'react-router-dom'

const MainTagLi = tagObj => {
  return (
    <article>
      <a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc">
          <img src={tagObj.photo} className="br-100 w4 h4 mr4" alt="tag" />
        </div>
        <div className="dtc v-mid pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">
            {tagObj.artTitle}
          </h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">
            {tagObj.artist}
          </h2>
        </div>
      </a>
    </article>
  )
}

export default MainTagLi

// <dl className="mt2 f6">
//   <dt className="clip">Distance</dt>
//   <dd className="ml0">5 mi.</dd>
// </dl>
