import React from 'react'
import { connect } from 'react-redux'
import { head, path, compose } from 'ramda'
import {
  SET_ART_TITLE,
  SET_ARTIST,
  SET_POSITION,
  SET_TAG_PHOTO,
  SET_GEO,
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
    /*getCurrentPosition(function(err, result) {
      if (err) {
        /*handle error
      }
      console.log('result', result)
      this.dispatch({ tyep: SET_GEO, payload: result })
    })
  */
  }

  render() {
    const location = {
      lat: 32.7765,
      lng: -79.9311
    }
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <FormHeader />
        <main className="overflow-scroll flex flex-column tc w-100 vh-100 mt2">
          <h2 className="f4 f2-ns">New Tag</h2>
          <div id="form" className="center">
            <form className="ph2" onSubmit={this.props.submitProfile}>
              <div id="map" className="center">
                <TaggedMap
                  center={location}
                  zoom={16}
                  containerElement={
                    <div style={{ height: '400px', width: '500px' }} />
                  }
                  mapElement={
                    <div style={{ height: '400px', width: '500px' }} />
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
                    className="h3 w3 ba pa2 br2 mr2"
                    src={
                      this.props.photo
                        ? this.props.photo
                        : "https://placehold.it/64x64?text='photo'"
                    }
                  />
                  <FileInput
                    className="pv3 ml2"
                    onChange={this.props.handlePhoto}
                  >
                    <Button className="bg-green ba br2 b--light-green black">
                      Upload
                    </Button>
                  </FileInput>
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

const mapStateToProps = state => {
  return {
    position: state.tag.position,
    artTitle: state.tag.artTitle,
    artist: state.tag.artist,
    photo: state.tag.photo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    submitProfile: e => {
      e.preventDefault()
    },
    handlePosition: e =>
      dispatch({ type: SET_POSITION, payload: e.target.value }),
    handleArtTitle: e =>
      dispatch({ type: SET_ART_TITLE, payload: e.target.value }),
    handleArtist: e => dispatch({ type: SET_ARTIST, payload: e.target.value }),
    handlePhoto: (e, results) => {
      const blob = compose(path(['target', 'result']), head, head)(results)
      console.log('blob:', blob)
      dispatch({ type: 'SET_TAG_PHOTO', payload: blob })
    },
    clearTag: () => dispatch({ type: CLEAR_TAG })
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export default connector(NewTagForm)
