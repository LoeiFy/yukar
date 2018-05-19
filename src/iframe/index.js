document.getElementById('trigger').addEventListener('click', function() {
  return document.getElementById('iframe').contentWindow.postMessage({content: '??'}, '*')

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
