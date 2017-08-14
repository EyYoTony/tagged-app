import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class TaggedMap extends React.Component {
  render() {
    const markers = this.props.markers || []
    const zoom = this.props.zoom || 16
    const center = this.props.center || {
      lat: 32.7765,
      lng: 79.9311
    }
    return (
      <GoogleMap
        defaultZoom={zoom}
        center={center}
        options={{ streetViewControl: false, mapTypeControl: false }}
      />
    )
  }
}

export default withGoogleMap(TaggedMap)
