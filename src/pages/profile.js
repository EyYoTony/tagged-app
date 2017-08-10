import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_TAGS } from '../constants'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getMyTags()
  }

  render() {
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <header className="flex flex-row justify-between items-center bg-dark-green h3 b f3 fw6 pa3 mb2">
          <div>{'<'}</div>
          <div>Street Art Search</div>
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
        <main className="flex flex-column tc w-100 vh-100 mt2">
          <div>
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
              <div className="tc">
                <img
                  src="http://beverlypress.com/wp-content/uploads/2016/07/hot-dog-06.jpg"
                  className="br-100 h4 w4 dib ba b--black-05 pa2"
                  title="placeholder avatar"
                />
                <h1 className="f3 mb2">EyYoTony</h1>
                <h2 className="f5 fw4 gray mt0">Alexander Swanson</h2>
                <a
                  className="f6 tc link mt1 db br1 bw2 ph3 pv2 mb2 white bg-dark-green hover-bg-green"
                  href="#0"
                >
                  Edit Profile
                </a>
              </div>
            </article>
          </div>
          <div>
            <h2 className="f3 fw6 pa3 mt0 bb b--black-10">Art You Mapped</h2>
          </div>
          <div className="mw6 center">
            <article>
              <div className="dtc">
                <img
                  src={
                    'https://fastestpedestrian.files.wordpress.com/2014/06/img_7374.jpg'
                  }
                  className="br-100 w4 h4 mr4"
                />
              </div>
              <div className="dtc v-mid pl2">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">
                  College Lodge Mural
                </h1>
                <h2 className="f6 fw4 mt2 mb0 black-60">
                  Shepard Fairey
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
              </div>
            </article>
          </div>
        </main>
      </div>
    )
  }
}

const asyncFetchMyTags = dispatch => {
  fetch('http://localhost:5000/tags?filter=creatorName:EyYoTony')
    .then(res => res.json())
    .then(res => dispatch({ type: SET_TAGS, payload: res }))
    .catch(error => {
      console.error(error)
    })
}

const mapStateToProps = state => {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getMyTags: () => {
      asyncFetchMyTags(dispatch)
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(Profile)
