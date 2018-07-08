export default function (code) {
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
