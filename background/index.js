import { encrypt, decrypt } from './crypto.js'

window.KEY = Math.random().toString(36).substr(8)

function onMessage(message, sender, response) {
  const { type, payload } = message
  let data = ''

  if (type === 'ENCRYPT') {
    data = encrypt(payload, window.KEY)
  }

  if (type === 'DECRYPT') {
    data = decrypt(payload, window.KEY)
  }

  if (type === 'GET_KEY') {
    data = window.KEY
  }

  if (type === 'SET_KEY') {
    window.KEY === payload
    data = window.KEY
  }

  response(data)
}

chrome.runtime.onMessage.addListener(onMessage)
