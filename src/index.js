import $ from './component/query.js'
import babel from './component/babel.js'
import isotope from './component/isotope.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}

let sendedReload = false

;(async () => {

  await $().ready()

  const editor = window.CodeMirror.fromTextArea($('#editor').context, {
    lineNumbers: true,
    mode: 'htmlmixed',
    tabSize: 2,
  })

  editor.on('change', function ({ doc, options }) {
    code[options.mode] = doc.getValue()
  })

  $('#mode').on('click', function ({ target }) {
    if (target.tagName === 'BUTTON') {
      const { value: mode } = target
      const { doc } = editor
      editor.setOption('mode', mode)
      doc.setValue(code[mode])
    }
  })

  $('#run').on('click', function () {
    window.frames[0].postMessage({ type: 'reload' }, '*')
    sendedReload = true
  })

})()

window.addEventListener('message', ({ data }) => {
  const { type, payload } = data

  if (type === 'log') {
    const { method, data } = payload
    $('#console').append(`<p class="${method}">${data}</p>`)
  }

  if (type === 'status' && payload === 'ready' && sendedReload) {
    sendedReload = false

    const {
      jsx,
      css,
      htmlmixed: html,
    } = code

    window.frames[0].postMessage({
      type: 'code',
      payload: {
        js: babel(jsx),
        css,
        html,
      },
    }, '*')
  }
})

const text = `
<!DOCTYPE html>
<html>
<head>
</script>
<script crossorigin src="//unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js"></script>
<script>
window['react'] = window.React;window['reactDom'] = window.ReactDOM
</script>
<link rel="stylesheet" href="//unpkg.com/antd@3.5.2/dist/antd.min.css" />
</head>
<body>
<h1>111</h1>
</body>
</html>
`

isotope(text)
