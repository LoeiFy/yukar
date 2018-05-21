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
const createHTML = (content) => {
  document.body.innerHTML = content
}

function sendMessage(data) {
  window.top.postMessage(data, '*')
}

function run(code) {
  const { js, css, html } = code

  createHTML(html)
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

window.onload = () => sendMessage({ type: 'status', payload: 'ready' })
window.onerror = err => console.error(err)

;['log', 'error', 'info', 'warn'].forEach((type) => {
  window.console[type] = (...params) => sendMessage({
    type: 'log',
    payload: {
      method: type,
      data: params,
    },
  })
})
