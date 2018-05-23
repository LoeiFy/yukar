NodeList.prototype.remove = function remove() {
  for (let i = this.length - 1; i >= 0; i -= 1) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i])
    }
  }
}

function urlParser(url) {
  if (url.indexOf('chrome-extension') === -1) {
    return url
  }
  return url.replace('chrome-extension', 'http')
}

export default function (content) {
  const fragment = document.createElement('div')
  fragment.innerHTML = content

  const scripts = fragment.querySelectorAll('script')
  scripts.remove()

  const csses = fragment.querySelectorAll('link[rel=stylesheet]')
  csses.remove()

  const styles = fragment.querySelectorAll('style')
  styles.remove()

  const js = []
  const script = []
  const css = []
  const style = []
  const html = fragment.innerHTML

  Array.from(scripts).forEach(({ textContent, src }) => {
    if (src) {
      js.push(urlParser(src))
      return
    }
    if (textContent) {
      script.push(textContent)
    }
  })

  Array.from(csses).forEach(({ href }) => css.push(urlParser(href)))

  Array.from(styles).forEach(({ textContent }) => style.push(textContent))

  return {
    script,
    js,
    html,
    css,
    style,
  }
}
