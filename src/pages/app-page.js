import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_TAGS } from '../constants'
import MainHeader from '../components/app/main-header'
import MainTagLi from '../components/app/main-tag-li'
import TaggedMap from '../components/map'

class AppPage extends React.Component {
  componentDidMount() {
    this.props.getTags()
  }

  render() {
    const location = {
      lat: 32.7765,
      lng: -79.9311
    }
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <MainHeader />
        <main className="flex flex-column tc w-100 vh-100 mt2">
          <div id="map" className="center">
            <TaggedMap
              center={location}
              zoom={16}
              containerElement={
                <div style={{ height: '400px', width: '500px' }} />
              }
              mapElement={<div style={{ height: '400px', width: '500px' }} />}
              markers={[]}
            />
          </div>
          <div>
            <h2 className="f3 fw6 pa3 mt0 bb b--black-10">Art Near You</h2>
          </div>
          <div className="mw6 center">
            {map(tag => MainTagLi(tag), this.props.tags)}
          </div>
        </main>
      </div>
    )
  }
}

const asyncFetchTags = dispatch => {
  fetch('http://localhost:5000/tags')
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
    getTags: () => {
      asyncFetchTags(dispatch)
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(AppPage)
