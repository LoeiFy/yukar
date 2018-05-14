import c from '../src/test.js'

document.addEventListener('DOMContentLoaded', function () {
  console.log(c)

const jsxT = document.getElementById('jsx')
const editor = CodeMirror.fromTextArea(jsxT, {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  mode: 'jsx',
})

editor.setOption('theme', 'idea')

document.getElementById('trigger').addEventListener('click', function() {
  const script = document.createElement('script')

  const { code } = Babel.transform(editor.doc.getValue(), {
    presets: ['es2015', 'react'],
    plugins: [
      'transform-es2015-modules-umd',
      'transform-class-properties',
    ],
  })

  console.log(code)

  script.innerHTML = code

  document.head.appendChild(script)

  document.getElementById('result').appendChild(script)
})

})
