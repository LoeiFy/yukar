import $ from './component/query.js'
import babel from './component/babel.js'
import isotope from './component/isotope.js'
import fetch from './component/fetch.js'
import log from './component/log.js'

const code = {
  jsx: '',
  css: '',
  htmlmixed: '',
}
const status = {
  sendedReload: false,
  running: false,
};

(async () => {
  await $().ready()

  const store = JSON.parse(window.localStorage.yukar || '{}')

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

  editor.on('change', ({ doc, options }) => {
    code[options.mode] = doc.getValue()
    window.localStorage.setItem('yukar', JSON.stringify(code))
  })

  $('#mode').on('click', ({ target }) => {
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

  $('#run').on('click', function run() {
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

  $('#result').on('click', function result() {
    $('button').removeClass('active')
    $(this).addClass('active')
    $('.tab').css({ transform: 'translateX(-100%)' })
  })

  $('#log').on('click', function showLog() {
    $('button').removeClass('active')
    $(this).addClass('active')
    $('.tab').css({ transform: 'translateX(-200%)' })
  })

  $('#clear').on('click', () => {
    $('#console').html('')
  })
})()

window.addEventListener('message', ({ data: info }) => {
  const { type, payload } = info

  if (type === 'log') {
    const { method, data } = payload
    $('#console').append(log(method, data))
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
    const script = [];

    (async () => {
      const urls = js.map(url => ({ url, type: 'js' }))
        .concat(css.map(url => ({ url, type: 'css' })))

      try {
        const res = await fetch(urls)

        res.forEach(({ data, type: kind }) => {
          if (kind === 'js') {
            script.push(data)
          }
          if (kind === 'css') {
            style.push(data)
          }
        })

        script.push(headScript)
        script.push(babel(jsx))
        style.push(code.css)
      } catch (e) {
        status.running = false

        $('#console').append(log('error', e))
        $('#run').removeClass('loading')
        $('#log').context.click()

        return
      }

      window.frames[0].postMessage({ type: 'code', payload: { script, style, html } }, '*')

      status.running = false

      $('#run').removeClass('loading')
      if (!$('#log').hasClass('active')) {
        $('#result').context.click()
      }
    })()
  }
})
