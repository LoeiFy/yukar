export default function (type, data) {
  const time = new Date().toLocaleTimeString().split(' ')[0]
  const message = []

  data.forEach((m) => {
    if (typeof m === 'string') {
      message.push(m)
      return
    }
    try {
      message.push(JSON.stringify(m))
    } catch (e) {
      message.push(m)
    }
  })

  return `
    <p class="${type}">
      <span>${time}</span>
      <span>${message.join(' ')}</span>
    </p>
  `
}
