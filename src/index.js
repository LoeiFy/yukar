import $ from './component/query.js'

;(async () => {

  await $().ready()

  const { CodeMirror } = window
  const options = { lineNumbers: true, mode: 'htmlmixed' }
  const { context } = $('#editor')
  const editor = CodeMirror.fromTextArea(context, options)
  // editor.setOption('theme', 'idea')

})()
