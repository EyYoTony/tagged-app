import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { SET_TAGS } from '../constants'
import MainHeader from '../components/main-header'
import MainTagLi from '../components/main-tag-li'

class App extends React.Component {
  componentDidMount() {
    this.props.getTags()
    // this.props.dispatch({
    //   type: SET_TAGS,
    //   payload: this.props.getTags()
    // })
  }

  render() {
    return (
      <div className="flex flex-column justify-between vh-100 w-100 avenir bg-white">
        <MainHeader />
        <main className="flex flex-column tc w-100 vh-100 mt2">
          <div>
            <img
              src={
                'https://twixlmedia.com/wp-content/uploads/2012/09/Screen-Shot-2012-09-10-at-12.12.05.png'
              }
              alt="placeholder"
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
export default connector(App)
