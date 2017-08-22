import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_PROFILE_TAGS } from '../constants'
import formatUserId from '../components/format-user-id'
import ProfileHeader from '../components/profile/profile-header'
import ProfileTagLi from '../components/profile/profile-tag-li'
import ProfileCard from '../components/profile/profile-card'
import Auth from '../auth'

class Profile extends React.Component {
  componentDidMount() {
    this.props.getMyTags()
  }

  confirmLogOut = () => {
    if (window.confirm('are you sure you want to log out?')) {
      Auth().logout()
    }
  }

  render() {
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <ProfileHeader />
        <main className="flex flex-column tc w-100 vh-100 mt2">
          <div>
            {ProfileCard(this.confirmLogOut)(this.props.session.profile)}
          </div>
          <div>
            <h2 className="f3 fw6 pa3 mt0 bb b--black-10">Art You Mapped</h2>
          </div>
          <div className="mw6 center">
            {map(tag => ProfileTagLi(tag), this.props.profileTags)}
          </div>
        </main>
      </div>
    )
  }
}

const asyncFetchMyTags = (dispatch, getState) => {
  const userId = formatUserId(getState().session.profile.sub)
  console.log(userId)
  fetch(`http://localhost:5000/tags?filter=creatorId:${userId}`)
    .then(res => res.json())
    .then(res => dispatch({ type: SET_PROFILE_TAGS, payload: res }))
    .catch(error => {
      console.error(error)
    })
}

const mapStateToProps = state => {
  return {
    profileTags: state.profileTags,
    session: state.session
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
