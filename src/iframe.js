function execute(code) {
  const { script, style, html } = code

  style.forEach((css) => {
    const e = document.createElement('style')
    e.innerHTML = css
    document.head.appendChild(e)
  })

  document.body.innerHTML = html

  script.forEach((js) => {
    const e = document.createElement('script')
    e.innerHTML = js
    document.head.appendChild(e)
  })

  document.dispatchEvent(new Event('DOMContentLoaded'))
  window.dispatchEvent(new Event('load'))
}

window.addEventListener('message', ({ data }) => {
  const { type, payload } = data

  if (type === 'reload') {
    window.location.reload()
  }
  if (type === 'code') {
    execute(payload)
  }
})

window.onload = () => window.top.postMessage({ type: 'status', payload: 'ready' }, '*')
window.onerror = err => console.error(err); // eslint-disable-line no-console

['log', 'error', 'info', 'warn'].forEach((type) => {
  window.console[type] = (...params) => window.top.postMessage({
    type: 'log',
    payload: {
      method: type,
      data: params,
    },
  }, '*')
})
