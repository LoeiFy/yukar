# yukar

Chrome Extension JavaScript Code Editor

## feature

- ES6 / 7
- JSX / Vue JSX
- Offline Use

## Example

### Async

```js
;(async () => {
  const a = await 'Async Await'
  console.log(a)
})()
// Async Await
```

### Class Properties

```js
class A {
  s = 'Class Properties'
	test() {
    console.log(this.s)
  }
}

(new A()).test()
// Class Properties
```

### Object Rest Spread

```js
const s = [1,2]
const b = [3, ...s]
console.log(b)
// 3,1,2
```

### Decorators

```js
function log(target, name, descriptor) {
  const original = descriptor.value
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      console.log(`Arguments: ${args}`)
      try {
        const result = original.apply(this, args)
        console.log(`Result: ${result}`)
        return result
      } catch (e) {
        console.log(`Error: ${e}`)
        throw e
      }
    }
  }
  return descriptor
}

class Example {
    @log
    sum(a, b) {
        return a + b
    }
}

const e = new Example()
e.sum(1, 2)
// Arguments: 1,2
// Result: 3
```

### React JSX

```html
<script crossorigin src="//unpkg.com/moment@2.14.1/min/moment.min.js"></script>
<script crossorigin src="//unpkg.com/react@16.3.2/umd/react.production.min.js"></script>
<script crossorigin src="//unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js"></script>
<script crossorigin src="//unpkg.com/antd@3.5.2/dist/antd-with-locales.min.js"></script>
<script>window['react'] = window.React;window['reactDom'] = window.ReactDOM</script>
<link rel="stylesheet" href="//unpkg.com/antd@3.5.2/dist/antd.min.css" />

<div id="root"></div>
```

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'antd';

function success() {
  const modal = Modal.success({
    title: 'This is a notification message',
    content: 'This modal will be destroyed after 1 second',
  });
  setTimeout(() => modal.destroy(), 1000);
}


ReactDOM.render(
  <Button onClick={success}>Success</Button>,
  document.getElementById('root')
);
```

### Vue JSX

```html
<script src="https://unpkg.com/vue"></script>
<div id="app"></div>
```

```js
new Vue({
  el: '#app',
  data: {
    msg: 'Support vue jsx'
  },
  methods: {
    hello () {
      alert('This is the message.')
    }
  },
  render(h) {
    return (
      <span class={{ 'my-class': true }} on-click={ this.hello }>
        { this.msg }
      </span>
    )
  }
})
```

## Images

<img width="822" alt="screen shot 2018-05-23 at 10 39 15 am" src="https://user-images.githubusercontent.com/2193211/40400634-a50bf078-5e75-11e8-9ff8-63efacfee8c1.png">


<img width="814" alt="screen shot 2018-05-23 at 10 38 30 am" src="https://user-images.githubusercontent.com/2193211/40400636-a5edb44a-5e75-11e8-82ad-b9fdf446a358.png">


<img width="817" alt="screen shot 2018-05-23 at 10 38 10 am" src="https://user-images.githubusercontent.com/2193211/40400638-a690f786-5e75-11e8-90f9-59da5c395d75.png">


<img width="817" alt="screen shot 2018-05-23 at 10 38 01 am" src="https://user-images.githubusercontent.com/2193211/40400639-a72db6c0-5e75-11e8-89c0-629ff6c2c8f4.png">


<img width="819" alt="screen shot 2018-05-23 at 10 37 50 am" src="https://user-images.githubusercontent.com/2193211/40400640-a78aa088-5e75-11e8-812c-9be47b3792a1.png">


## Related

<img src="https://images-na.ssl-images-amazon.com/images/I/61vGizpMD1L.jpg" width="150" />
