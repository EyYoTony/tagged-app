//This code was taken and modified from tripott - https://github.com/tripott/pro-log-fishing/blob/master/src/geolocation.js
const getCurrentPosition = cb => props => {
  let err = {}
  if (navigator.geolocation) {
    const timeoutVal = 10 * 1000 * 1000
    navigator.geolocation.getCurrentPosition(displayPosition, displayError, {
      enableHighAccuracy: true,
      timeout: timeoutVal,
      maximumAge: 0
    })
    if (err.message) return cb(err)
    //cb(null, pos, props.dispatch)
  } else {
    err.message = 'not supported'
    return cb(err)
  }

  function displayPosition(position) {
    //for some reason it could not see dispatch through the cb function, so have to pass it through manually
    cb(null, position, props.dispatch)
  }

  function displayError(error) {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    }
    err.message = errors[error.code]
    console.log('displayError: ', err)
  }
}

export default getCurrentPosition
