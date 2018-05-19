import $ from './component/query.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}
const map = {
  HTML: 'htmlmixed',
  CSS: 'css',
  JavaScript: 'jsx',
}

;(async () => {

  await $().ready()

  const editor = window.CodeMirror.fromTextArea($('#editor').context, {
    lineNumbers: true,
    mode: 'htmlmixed',
  })

  editor.on('change', function ({ doc, options }) {
    const value = doc.getValue()
    const { mode } = options
    code[mode] = value
  })

  $('#mode').on('click', function ({ target }) {
    if (target.tagName !== 'BUTTON') {
      return
    }
    const { textContent: type } = target
    const { doc } = editor

    editor.setOption('mode', map[type])
    doc.setValue(code[map[type]])
  })

})()
