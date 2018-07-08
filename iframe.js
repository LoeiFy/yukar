import execute from './component/execute.js'
import './component/console.js'

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
window.onerror = error => console.error(error) // eslint-disable-line no-console
