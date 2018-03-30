function inject() {
  const script = document.createElement ('script')
  const head = document.head

  script.setAttribute('type', 'module')
  script.setAttribute('src', chrome.extension.getURL('inject/index.js'))
  head.insertBefore(script, head.lastChild)
}

// function receiveInjectMessage({ data, origin }) {
//   console.log('content: '+ data)
//   window.removeEventListener('message', receiveInjectMessage)
//   window.postMessage({ m: 'back' }, origin)

//   setTimeout(() => {
//     window.addEventListener('message', receiveInjectMessage)
//   })
// }

document.addEventListener('DOMContentLoaded', inject)
// window.addEventListener('message', receiveInjectMessage)

// chrome.runtime.sendMessage({ type: 'GET_KEY'}, function(response) {
  // console.log(response)
// })

const port = chrome.runtime.connect()

window.addEventListener('message', function(event) {
    console.log("Content script received: " + event.data.text)
    // port.postMessage(event.data.text)
}, false)
