export function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString()
}

export function decrypt(text, key) {
  return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8)
}
