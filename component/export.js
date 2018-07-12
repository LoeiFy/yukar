import exportFile from './file.js'
import template from './html.js'
import isotope from './isotope.js'

const requireRegex = /(\brequire\s*?\(\s*?)(['"])([^'"]+)(\2\s*?\))/g
const importRegex = /\bimport\s.*/g

export default function (code, vue) {
  const {
    css,
    html,
    js,
    script,
    style,
  } = isotope(code.htmlmixed)

  const plugins = [
    'transform-class-properties',
    'transform-decorators-legacy',
    'transform-object-rest-spread',
  ]

  if (requireRegex.test(code.jsx) || importRegex.test(code.jsx)) {
    plugins.push('transform-es2015-modules-umd')
  }

  if (vue) {
    plugins.push('transform-vue-jsx')
  }

  const JSs = js
    .map(src => `<script src="${src}"></script>`)
    .join('')
  const CSSs = css
    .map(href => `<link rel="stylesheet" href="${href}" />`)
    .join('')
  const scripts = script
    .map(s => `<script>${s}</script>`)
    .join('')
  const styles = style
    .map(s => `<style>${s}</style>`)
    .join('')
  const inlineStyle = `<style>${code.css}</style>`

  const head = JSs + scripts + CSSs + styles + inlineStyle

  const mainScript = `
  <script type="text/babel" data-presets="react" data-plugins="${plugins}">
    ${code.jsx}
  </script>
  `

  const content = template
    .replace('@@head', head)
    .replace('@@body', html)
    .replace('@@script', mainScript)

  exportFile('index.html', content)
}
