import $ from './component/query.js'
import babel from './component/babel.js'

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
