import $ from './component/query.js'
import babel from './component/babel.js'
import isotope from './component/isotope.js'
import fetch from './component/fetch.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}
const status = {
  sendedReload: false,
  running: false,
}

;(async () => {

  await $().ready()

  const store = JSON.parse(window.localStorage['yukar'] || '{}')

  Object.keys(store).forEach((key) => {
    code[key] = store[key]
  })

  const editor = window.CodeMirror.fromTextArea($('#editor').context, {
    lineNumbers: true,
    mode: 'htmlmixed',
    lineWrapping: true,
    tabSize: 2,
  })

  editor.setValue(code.htmlmixed)

  editor.on('change', function ({ doc, options }) {
    code[options.mode] = doc.getValue()
    window.localStorage.setItem('yukar', JSON.stringify(code))
  })

  $('#mode').on('click', function ({ target }) {
    if (target.tagName === 'BUTTON') {
      const { value: mode } = target
      const { doc } = editor

      editor.setOption('mode', mode)
      doc.setValue(code[mode])

      $('button').removeClass('active')
      $(target).addClass('active')
      $('.tab').css({ transform: 'translateX(0)' })
    }
  })

  $('#run').on('click', function () {
    if (!status.running) {
      window.frames[0].postMessage({ type: 'reload' }, '*')
      status.sendedReload = true
      status.running = true

      $(this).addClass('loading')
      if (!$('#preserve').context.checked) {
        $('#console').html('')
      }
    }
  })

  $('#result').on('click', function () {
    $('button').removeClass('active')
    $(this).addClass('active')
    $('.tab').css({ transform: 'translateX(-100%)' })
  })

  $('#log').on('click', function () {
    $('button').removeClass('active')
    $(this).addClass('active')
    $('.tab').css({ transform: 'translateX(-200%)' })
  })

  $('#clear').on('click', function () {
    $('#console').html('')
  })

})()

window.addEventListener('message', ({ data }) => {
  const { type, payload } = data

  if (type === 'log') {
    const { method, data } = payload
    $('#console').append(`
      <p class="${method}">
        <span>${new Date().toISOString().split('.')[0]}</span>
        ${data}
      </p>
    `)
  }

  if (type === 'status' && payload === 'ready' && status.sendedReload) {
    status.sendedReload = false

    const { htmlmixed, jsx } = code
    const {
      script: headScript,
      js,
      html,
      css,
      style,
    } = isotope(htmlmixed)
    const script = []

    ;(async () => {

      const urls = js.map(url => ({ url, type: 'js' }))
        .concat(css.map(url => ({ url, type: 'css' })))

      try {
        const res = await fetch(urls)

        res.forEach(({ data, type }) => {
          if (type === 'js') {
            script.push(data)
          }
          if (type === 'css') {
            style.push(data)
          }
        })
      } catch (e) {
        $('#console').append(`
          <p class="error">
            <span>${new Date().toISOString().split('.')[0]}</span>
            ${e}
          </p>
        `)
        $('#run').removeClass('loading')
        return $('#log').context.click()
      }

      script.push(headScript)
      script.push(babel(jsx))
      style.push(code.css)

      const payload = { script, style, html }

      window.frames[0].postMessage({ type: 'code', payload }, '*')

      status.running = false

      $('#run').removeClass('loading')
      if (!$('#log').hasClass('active')) {
        $('#result').context.click()
      }

    })()
  }
})
