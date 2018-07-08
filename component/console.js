const types = [
  'log',
  'error',
  'info',
  'warn',
]

types.forEach((type) => {
  window.console[type] = (...params) => {
    function sendLog(method, data) {
      window.top.postMessage({
        type: 'log',
        payload: { method, data },
      }, '*')
    }

    try {
      sendLog(type, params)
    } catch (e) {
      sendLog(type, params.map(param => Object.prototype.toString.call(param)))
    }
  }
})

export default types
