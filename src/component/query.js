class Query {
  constructor(e) {
    const regex = /HTML.*?Element/
    if (e) {
      const type = Object.prototype.toString.call(e)
      this.elements = regex.test(type) ? [e] : Array.from(document.querySelectorAll(e))
    }
  }

  addClass(name) {
    this.elements.forEach(e => e.classList.add(name))
    return this
  }

  removeClass(name) {
    this.elements.forEach(e => e.classList.remove(name))
    return this
  }

  on(events, callback) {
    const evs = events
      .split(',')
      .map(ev => ev.trim())

    this.elements.forEach((e) => {
      evs.forEach((ev) => {
        e.addEventListener(ev, callback, false)
      })
    })

    return this
  }

  get context() {
    return this.elements.length === 1 ? this.elements[0] : this.elements
  }

  ready() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve()
      })
    })
  }
}

export default e => new Query(e)
