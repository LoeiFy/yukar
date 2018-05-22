const { fetch } = window

function replacer(match) {
  if (match.indexOf('http') > -1) {
    return match
  }

  const { href, pathname, origin } = new URL(this.url)
  const url = match
    .replace(/\"|\'/g, '')
    .split('url(')[1].split(')')[0]

  if (url.charAt(0) === '/') {
    return `url(${origin}${url})`
  }

  const splited = pathname.split('/')
  splited.pop()

  return `url(${origin}${splited.join('/')}/${url})`
}

export default function (urls) {
  const pr = urls.map(({ url, type }) => {
    return fetch(url)
      .then(res => res.text())
      .then((data) => {
        if (type === 'css') {
          return Promise.resolve(data.replace(/url\(.*?\)/g, replacer.bind({ url })))
        }
        return Promise.resolve(data)
      })
      .then(data => ({ data, type }))
  })
  return Promise.all(pr)
}
