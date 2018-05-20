NodeList.prototype.remove  = function () {
  for (let i = this.length - 1; i >= 0; i -= 1) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i])
    }
  }
}

export default function (content) {
  let fragment = document.createElement('div')
  fragment.innerHTML = content

  const scripts = fragment.querySelectorAll('script')
  scripts.remove()

  const src = []
  const script = []
  const html = fragment.innerHTML

  Array.from(scripts).forEach(({ textContent, src: url }) => {
    if (url && !textContent) {
      src.push(url)
    }
    if (textContent && !url) {
      script.push(textContent)
    }
  })

  console.log(script)
  console.log(html)
  console.log(src)
}
