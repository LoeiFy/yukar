export default function (type, data) {
  const time = new Date().toLocaleTimeString().split(' ')[0]

  return `
    <p class="${type}"><span>${time}</span>${data}</p>
  `
}
