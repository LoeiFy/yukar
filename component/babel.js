const { Babel } = window
const requireRegex = /(\brequire\s*?\(\s*?)(['"])([^'"]+)(\2\s*?\))/g
const importRegex = /\bimport\s.*/g

export default function (js, vue) {
  const presets = ['react']
  const plugins = [
    'transform-class-properties',
    'transform-decorators-legacy',
    'transform-object-rest-spread',
  ]

  if (vue) {
    Babel.registerPlugin('transform-vue-jsx', window['babel-plugin-transform-vue-jsx'])
    plugins.push('transform-vue-jsx')
  }

  if (requireRegex.test(js) || importRegex.test(js)) {
    plugins.push('transform-es2015-modules-umd')
  }

  return Babel.transform(js, { presets, plugins }).code
}
