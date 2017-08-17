import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_TAGS, SET_GEO } from '../constants'
import MainHeader from '../components/app/main-header'
import MainTagLi from '../components/app/main-tag-li'
import TaggedMap from '../components/map'
import getCurrentPosition from '../geolocation'

class AppPage extends React.Component {
  componentDidMount() {
    this.props.getTags()
    getCurrentPosition(function(err, result, dispatch) {
      if (err) {
        /*handle error*/
        console.log('There was an error getting the uer location: ', err)
      }
      dispatch({
        type: SET_GEO,
        payload: { lat: result.coords.latitude, lng: result.coords.longitude }
      })
    })(this.props)
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
              center={this.props.geo}
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

const asyncFetchTags = (dispatch, getState) => {
  fetch('http://localhost:5000/tags')
    .then(res => res.json())
    .then(res => dispatch({ type: SET_TAGS, payload: res }))
    .catch(error => {
      console.error(error)
    })
}

const mapStateToProps = state => {
  return {
    tags: state.tags,
    geo: state.geo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getTags: () => {
      dispatch(asyncFetchTags)
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(AppPage)
