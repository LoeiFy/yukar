// import sendMessage from './message.js'

document.querySelector('.web_wechat_login_logo').addEventListener('click', () => {
  // var port = chrome.runtime.connect()
  window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*")
})

window.addEventListener('message', function(event) {
  console.log(event)
})
