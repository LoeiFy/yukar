console.log(CryptoJS)

function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString()
}

function decrypt(text, key) {
  return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8)
}

// chrome.tabs.onUpdated.addListener((id, info, tab) => {
//   DATA.id = id
//   DATA.info = info
//   DATA.tab = tab
// })
