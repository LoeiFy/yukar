import $ from './component/query.js'
import babel from './component/babel.js'
import isotope from './component/isotope.js'
import fetch from './component/fetch.js'
import log from './component/log.js'
import keywords from './component/keyword.js'
import Template from './component/template.js'

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

  const template = new Template('#popup')
  const store = JSON.parse(window.localStorage.yukar || '{}')
  const { mode: current = 'htmlmixed', jsxMode = '' } = window.localStorage

  Object.keys(store).forEach((key) => {
    code[key] = store[key]
  })

  const editor = window.CodeMirror.fromTextArea($('#editor').context, {
    lineNumbers: true,
    mode: current,
    lineWrapping: true,
    styleActiveLine: true,
    tabSize: 2,
  })

  const hintList = ['html', 'css', 'javascript']
  const hints = { ...window.CodeMirror.hint }

  hintList.forEach((ht) => {
    window.CodeMirror.hint[ht] = (ctx) => {
      const cursor = ctx.getCursor()
      const { line, ch } = cursor
      const { anchor, head } = ctx.findWordAt({ line, ch })
      const inner = hints[ht](ctx) || { from: cursor, to: cursor, list: [] }
      const word = ctx.getRange({ line, ch: anchor.ch }, { line, ch: head.ch })

      if (ht === 'javascript') {
        keywords.forEach((keyword) => {
          if (keyword.indexOf(word) > -1 && keyword.charAt(0) === word.charAt(0)) {
            inner.list.push(keyword)
          }
        })
      }

      if (word && 'abcdefghijklmnopqrstuvwxyz'.indexOf(word.slice(-1).toLowerCase()) === -1) {
        inner.list = []
      }

      return inner
    }
  })

  editor.setValue(code[current])

  $(`#${current}`).addClass('active')

  editor.on('inputRead', (ctx, input) => {
    if (
      input.origin !== '+input' ||
      input.text[0] === ';' ||
      input.text[0] === ',' ||
      input.text[0] === ' '
    ) {
      return
    }
    window.CodeMirror.commands.autocomplete(ctx, null, { completeSingle: false })
  })

  editor.on('change', ({ doc, options }) => {
    code[options.mode] = doc.getValue()
    window.localStorage.setItem('yukar', JSON.stringify(code))
    window.localStorage.setItem('mode', options.mode)
  })

  template.onChange = (value) => {
    const { mode } = editor.options
    code.htmlmixed = value.htmlmixed
    code.jsx = value.jsx
    code.css = ''
    editor.setValue(code[mode])
  }

  if (jsxMode === 'vue') {
    $('#vue').context.setAttribute('checked', true)
  }

  $('#vue').on('change', function changeMode() {
    window.localStorage.setItem('jsxMode', this.checked ? 'vue' : '')
  })

  $('#tpl').on('click', () => template.open())

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
    const script = []

    ;(async () => {
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
        script.push(babel(jsx, $('#vue').context.checked))
        style.push(code.css)
      } catch (e) {
        status.running = false

        $('#console').append(log('error', [e.message || 'code transform error']))
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
