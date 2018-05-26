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

function throwError() {
  window.alert('No support this method.') // eslint-disable-line no-alert
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

const alerts = []

window.alert = (msg) => {
  alerts.push(msg)

  function getAlert() {
    return document.getElementById('alert')
  }
  function popup() {
    const elements = {
      view: document.createElement('div'),
      inner: document.createElement('div'),
      button: document.createElement('button'),
      p: document.createElement('p'),
    }
    const {
      view,
      inner,
      button,
      p,
    } = elements

    const style = {
      view: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, .8)',
        zIndex: 9999,
      },
      inner: {
        width: '400px',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
        padding: '20px 25px',
        borderRadius: '2px',
        margin: '100px auto',
      },
      p: {
        color: '#333',
        margin: 0,
        fontSize: '14px',
        lineHeight: 1.4,
      },
      button: {
        margin: '30px auto 0',
        backgroundColor: '#0366d6',
        padding: '6px 20px',
        fontSize: '14px',
        color: '#fff',
        lineHeight: 1,
        borderRadius: '3px',
        border: 0,
        outline: 0,
        display: 'block',
        letterSpacing: '.5px',
        cursor: 'pointer',
      },
    }

    Object.keys(style).forEach((key) => {
      Object.keys(style[key]).forEach((css) => {
        elements[key].style[css] = style[key][css]
      })
    })

    view.id = 'alert';
    [p.textContent] = alerts
    button.textContent = 'OK'
    button.onclick = () => {
      document.body.removeChild(getAlert())
      if (alerts.length) {
        popup()
      }
    }

    inner.appendChild(p)
    inner.appendChild(button)
    view.appendChild(inner)
    document.body.appendChild(view)

    alerts.shift()
  }

  if (!getAlert()) {
    popup()
  }
}

window.prompt = throwError
window.confirm = throwError
window.close = throwError
window.open = throwError

window.onload = () => window.top.postMessage({ type: 'status', payload: 'ready' }, '*')
window.onerror = (error) => {
  const msg = error.indexOf('Script error') > -1 ?
    `${error} Maybe the object could not be cloned` : error
  return console.error(msg) // eslint-disable-line no-console
};

['log', 'error', 'info', 'warn'].forEach((type) => {
  window.console[type] = (...params) => window.top.postMessage({
    type: 'log',
    payload: {
      method: type,
      data: params,
    },
  }, '*')
})
