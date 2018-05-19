const createJS = (content) => {
  const script = document.createElement('script')
  script.innerHTML = content
  script.id = 'script'
  document.head.appendChild(script)
}

window.addEventListener('message', ({ data }) => {
  const { js, css, html } = data

  createJS(js)
})

window.onload = function () {
document.getElementById('test').addEventListener('click', function () {
  window.top.postMessage({ c: 0 }, '*')
})
}
