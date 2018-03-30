document.addEventListener('DOMContentLoaded', function () {
  const bgPage = chrome.extension.getBackgroundPage()
  const input = document.querySelector('#key')
  const button = document.querySelector('#setkey')

  input.value = bgPage.KEY
  button.addEventListener('click', function () {
    bgPage.KEY = input.value
  })
})
