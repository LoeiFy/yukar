const { Babel } = window

export default function (js) {
  const presets = ['es2015', 'react']
  const plugins = [
    'transform-es2015-modules-umd',
    'transform-class-properties',
  ]
  const { code } = Babel.transform(js, { presets, plugins })

  return code
}
