import $ from './query.js'
const { Babel } = window

Babel.registerPlugin('transform-vue-jsx', window['babel-plugin-transform-vue-jsx'])

export default function (js) {
  const presets = ['es2015', 'react']
  const plugins = [
    'transform-es2015-modules-umd',
    'transform-class-properties',
    'transform-decorators-legacy',
  ]

  if ($('#vue').context.checked) {
    plugins.push('transform-vue-jsx')
  }

  return Babel.transform(js, { presets, plugins }).code
}
