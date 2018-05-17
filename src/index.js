import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import css from './index.css'

class Yukar extends Component {
  render() {
    return (
      <div className={css.yukar}>Hello!</div>
    )
  }
}

ReactDOM.render(
  <Yukar />
, document.getElementById('root'))
