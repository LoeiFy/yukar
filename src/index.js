import $ from './component/query.js'
import babel from './component/babel.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}

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
    const {
      jsx,
      css,
      htmlmixed: html,
    } = code

    window.frames[0].postMessage({
      js: babel(jsx),
      css,
      html,
    }, '*')
  })

})()

window.addEventListener('message', (e) => {
  console.log(e)
})
