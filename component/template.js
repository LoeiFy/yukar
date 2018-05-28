import $ from './query.js'

const codes = {
  Vue: {
    htmlmixed: `<script src="//unpkg.com/vue"></script>

<div id="root">
  <p>{{ message }}</p>
</div>
    `,
    jsx: `new Vue({
  el: '#root',
  data: {
    message: 'Hello Vue.js!'
  }
})
    `,
  },
  'Vue JSX': {
    htmlmixed: `<script src="//unpkg.com/vue"></script>

<div id="root"></div>
    `,
    jsx: `new Vue({
  el: '#root',
  data: {
    msg: 'Vue JSX',
  },
  methods: {
    hello () {
      alert('Vue JSX')
    },
  },
  render(h) {
    return (
      <p on-click={ this.hello }>
        { this.msg }
      </p>
    )
  },
})
    `,
  },
  React: {
    htmlmixed: `<script src="//unpkg.com/react/umd/react.development.js"></script>
<script src="//unpkg.com/react-dom/umd/react-dom.development.js"></script>
<script>window['react'] = window.React;window['reactDom'] = window.ReactDOM</script>

<div id="root"></div>
    `,
    jsx: `import React, { Component } from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>React</div>,
  document.getElementById('root')
)
    `,
  },
  Antd: {
    htmlmixed: `<script src="//unpkg.com/react/umd/react.development.js"></script>
<script src="//unpkg.com/react-dom/umd/react-dom.development.js"></script>
<script src="//unpkg.com/moment"></script>
<script src="//unpkg.com/antd/dist/antd-with-locales.min.js"></script>
<script>window['react'] = window.React;window['reactDom'] = window.ReactDOM</script>
<link rel="stylesheet" href="//unpkg.com/antd/dist/antd.min.css" />

<div id="root"></div>
    `,
    jsx: `import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'antd'

function success() {
  const modal = Modal.success({
    title: 'Notification',
    content: 'This is a notification message',
  })
}

ReactDOM.render(
  <Button onClick={success}>Success</Button>,
  document.getElementById('root')
)
    `,
  },
  Element: {
    htmlmixed: `<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/element-ui"></script>
<link rel="stylesheet" href="//unpkg.com/element-ui/lib/theme-chalk/index.css" />

<div id="root">
  <el-button @click="visible = true">Button</el-button>
  <el-dialog :visible.sync="visible" title="Hello world">
    <p>Try Element</p>
  </el-dialog>
</div>
    `,
    jsx: `new Vue({
  el: '#root',
  data: {
    visible: false
  },
})
    `,
  },
}

export default class {
  constructor(wrapper) {
    this.wrapper = $(wrapper)
    this.codes = codes
    this.callback = () => null
    this.init()
  }

  set onChange(fn) {
    this.callback = fn
  }

  init() {
    Object.keys(this.codes)
      .map((key) => {
        const button = document.createElement('button')
        button.textContent = key
        button.addEventListener('click', () => {
          this.callback(this.codes[key])
          this.close()
        })
        return button
      })
      .forEach(button => this.wrapper.find('.btns')[0].appendChild(button))

    $(this.wrapper.find('.close')[0]).on('click', () => this.close())
    this.wrapper.on('click', (e) => {
      if (e.target.id === this.wrapper.context.id) {
        this.close()
      }
    })
  }

  open() {
    this.wrapper.addClass('active')
  }

  close() {
    this.wrapper.removeClass('active')
  }
}
