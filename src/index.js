import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/htmlmixed/htmlmixed'
import css from './index.css'

class Yukar extends Component {
  state = {
    mode: 'jsx',
    jsx: '',
    css: '',
    htmlmixed: '',
  }

  render() {
    const { mode } = this.state

    return (
      <div className={css.yukar}>
        <Button.Group>
          <Button onClick={() => this.setState({ mode: 'jsx' })}>Javascript</Button>
          <Button onClick={() => this.setState({ mode: 'css' })}>CSS</Button>
          <Button onClick={() => this.setState({ mode: 'htmlmixed' })}>HTML</Button>
        </Button.Group>
        <CodeMirror
          value={this.state[mode]}
          options={{ mode, lineNumbers: true }}
          onChange={(editor, data, value) => {
            const { origin } = data
            if (origin) {
              this.setState({ [mode]: value })
            }
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Yukar />
, document.getElementById('root'))
