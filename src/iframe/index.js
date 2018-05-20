const createJS = (content) => {
  const script = document.createElement('script')
  script.innerHTML = content
  document.head.appendChild(script)
}
const createCSS = (content) => {
  const style = document.createElement('style')
  style.innerHTML = content
  document.head.appendChild(style)
}

function run(code) {
  const { js, css, html } = code
  createCSS(css)
  createJS(js)
}

window.addEventListener('message', ({ data }) => {
  const { type, payload } = data

  if (type === 'reload') {
    window.location.reload()
  }
  if (type === 'code') {
    run(payload)
  }
})

window.onload = () => window.top.postMessage('ready', '*')
