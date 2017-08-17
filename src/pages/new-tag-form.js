import React from 'react'
import { connect } from 'react-redux'
import { head, path, compose, assoc } from 'ramda'
import {
  SET_ART_TITLE,
  SET_ARTIST,
  SET_POSITION,
  SET_TAG_PHOTO,
  SET_GEO,
  ADD_TAG_TO_TAGS,
  CLEAR_TAG
} from '../constants'
import { TextField, Button } from 't63'
import FileInput from '../components/file-input'
import FormHeader from '../components/form-header'
import TaggedMap from '../components/map'
import getCurrentPosition from '../geolocation'

//onSubmit={props.submitProfile(props.history)(props.match.params.id)} line - 21
class NewTagForm extends React.Component {
  componentDidMount() {
    this.props.clearTag()
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
        <FormHeader />
        <main className="overflow-scroll flex flex-column tc w-100 vh-100 mt2">
          <h2 className="f4 f2-ns">New Tag</h2>
          <div id="form" className="center">
            <form
              className="ph2"
              onSubmit={this.props.submitTag(this.props.history)}
            >
              <div id="map" className="center">
                <TaggedMap
                  center={this.props.geo}
                  zoom={16}
                  containerElement={
                    <div style={{ height: '420px', width: '450px' }} />
                  }
                  mapElement={
                    <div style={{ height: '400px', width: '450px' }} />
                  }
                  markers={[]}
                />
              </div>
              <TextField
                value={this.props.artTitle}
                onChange={this.props.handleArtTitle}
                name="Art Title*"
                helptxt="If unknown, put something to describe it"
              />
              <TextField
                value={this.props.artist}
                onChange={this.props.handleArtist}
                name="Artist"
                helptxt="If left blank, will default to 'Unknown'"
              />
              <div className="measure mt2">
                <label className="f6 b db mb2">Photo (optional)</label>
                <div className="flex justify-center pv4">
                  <img
                    className="h4 w4 ba pa2 br2 mr2"
                    src={
                      this.props.photo
                        ? this.props.photo
                        : "https://placehold.it/64x64?text='photo'"
                    }
                  />
                  <div id="file-input">
                    <FileInput
                      className="pv3 ml2"
                      onChange={this.props.handlePhoto}
                    >
                      <Button
                        type="button"
                        className="bg-green ba br2 b--light-green black"
                      >
                        Upload
                      </Button>
                    </FileInput>
                  </div>
                </div>
              </div>
              <div className="">
                <Button className="w-100 bg-green ba br2 b--light-green">
                  Save Contact
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
  }
}

const createTag = history => (dispatch, getState) => {
  var outTag = getState().tag
  outTag = assoc('position', getState().geo, outTag)
  console.log('outTag: ', outTag)
  fetch('http://localhost:5000/tags', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(outTag)
  })
    .then(res => res.json())
    .then(() => dispatch({ type: ADD_TAG_TO_TAGS, payload: outTag }))
    .then(() => history.push('/profile'))
}

const mapStateToProps = state => {
  return {
    position: state.tag.position,
    artTitle: state.tag.artTitle,
    artist: state.tag.artist,
    photo: state.tag.photo,
    geo: state.geo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    submitTag: history => e => {
      e.preventDefault()
      dispatch(createTag(history))
    },
    handlePosition: e =>
      dispatch({ type: SET_POSITION, payload: e.target.value }),
    handleArtTitle: e =>
      dispatch({ type: SET_ART_TITLE, payload: e.target.value }),
    handleArtist: e => dispatch({ type: SET_ARTIST, payload: e.target.value }),
    handlePhoto: (e, results) => {
      const blob = compose(path(['target', 'result']), head, head)(results)
      dispatch({ type: 'SET_TAG_PHOTO', payload: blob })
    },
    clearTag: () => dispatch({ type: CLEAR_TAG })
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(NewTagForm)
