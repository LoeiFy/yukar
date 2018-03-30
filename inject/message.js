// export default class Message {
//   constructor() {
//     this.ignore = 'type'
//   }

//   return new Promise((resolve) => {
//     window.postMessage(message, location.origin)
//     setTimeout(() => {
//       window.addEventListener('message', function onMessage({ data }) {
//         console.log('inject: ' +data)
//         resolve(data)
//         window.removeEventListener('message', onMessage)
//       })
//     })
//   })
// }
