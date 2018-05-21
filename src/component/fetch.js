const { fetch } = window

export default function (urls) {
  const pr = urls.map(({ url, type }) => {
    return fetch(url)
      .then(res => res.text())
      .then(data => ({ data, type }))
  })
  return Promise.all(pr)
}
