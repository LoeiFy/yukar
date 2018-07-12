export default `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title> DEMO </title>
<script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
<script src="https://unpkg.com/babel-plugin-transform-vue-jsx/dist/babel-plugin-transform-vue-jsx.min.js"></script>
<script>
window.Babel.registerPlugin('transform-vue-jsx', window['babel-plugin-transform-vue-jsx'])
</script>
@@head
</head>
<body>
@@body
@@script
</body>
</html>
`
