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
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        {MainHeader(this.props.session)}
        <main className="flex flex-column tc w-100 vh-100 mt2">
          <div id="map" className="center">
            <TaggedMap
              center={this.props.geo}
              zoom={16}
              containerElement={
                <div style={{ height: '400px', width: '500px' }} />
              }
              mapElement={<div style={{ height: '400px', width: '500px' }} />}
              markers={[
                {
                  position: this.props.geo,
                  key: `user_location`,
                  defaultAnimation: 2,
                  icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABVElEQVR42jWQPUtCYRiGbz9OapCGfeDxUEYZKTS0nKE0IQUpaLEv+4DUWl1CygaJ/oBEQ2lBi1OTQjUE1iKBJ4KiKRKi1aHfcJ7e55Tv+l7cz3XfAL8R2L3L2Ajs2R6Dua4PX8r02htGUfJAFb9WdCBfxhqNn/i1ndsQbd1PUqzSR4G8hdxz0KwKooIyQ17CZvzU36x9XeiNdo3KrUPKPkdovjpIwYJJd6nQ0A8ZfG73LkSNdpVefup0/V2ko/cVSj6M0/Slg+QESBpACuzE58qtvAGdfeZo/22B1upjNHPloOE0yKagBBZnp6w2ayQdCCjzNEWLNzKp5xIp6yJRFiC3mxDi7MTnVkUSQ+GKgwLHIHcEZHFiG9IQVNGuGSxAZyc+x0kMeRLQ7aOiTLcowzvxBE7RjsXZSUn+JRmQCzFjnv9n5gm4nSTExdAlS49oCng70C9TDYyoJxj9ZwAAAABJRU5ErkJggg==`
                }
              ]}
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
    geo: state.geo,
    session: state.session
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
