import $ from './component/query.js'
import babel from './component/babel.js'
import isotope from './component/isotope.js'
import fetch from './component/fetch.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}
const status = {
  sendedReload: false,
  running: false,
}

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
    if (!status.running) {
      window.frames[0].postMessage({ type: 'reload' }, '*')
      status.sendedReload = true
      status.running = true
    }
  })

})()

window.addEventListener('message', ({ data }) => {
  const { type, payload } = data

  if (type === 'log') {
    const { method, data } = payload
    $('#console').append(`<p class="${method}">${data}</p>`)
  }

  if (type === 'status' && payload === 'ready' && status.sendedReload) {
    status.sendedReload = false

    const { htmlmixed, jsx } = code
    const {
      script: headScript,
      js,
      html,
      css,
      style,
    } = isotope(htmlmixed)
    const script = []

    ;(async () => {

      const urls = js.map(url => ({ url, type: 'js' }))
        .concat(css.map(url => ({ url, type: 'css' })))
      const res = await fetch(urls)

      res.forEach(({ data, type }) => {
        if (type === 'js') {
          script.push(data)
        }
        if (type === 'css') {
          style.push(data)
        }
      })

      script.push(headScript)
      script.push(babel(jsx))
      style.push(code.css)

      const payload = { script, style, html }

      window.frames[0].postMessage({ type: 'code', payload }, '*')
      status.running = false

    })()
  }
})
