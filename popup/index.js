document.addEventListener('DOMContentLoaded', function () {
  const bgPage = chrome.extension.getBackgroundPage()
  document.querySelector('#button').addEventListener('click', function () {
    console.log(bgPage.DATA)
  })
})
