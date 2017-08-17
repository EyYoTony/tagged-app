import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_TAGS } from '../constants'
import ProfileHeader from '../components/profile/profile-header'
import ProfileTagLi from '../components/profile/profile-tag-li'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getMyTags()
  }

  render() {
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <ProfileHeader />
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
            {map(tag => ProfileTagLi(tag), this.props.tags)}
          </div>
        </main>
      </div>
    )
  }
}

const asyncFetchMyTags = (dispatch, getState) => {
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
      dispatch(asyncFetchMyTags)
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(Profile)
