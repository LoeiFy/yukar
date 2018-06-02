const fs = require('fs-extra')
const archiver = require('archiver')
const path = require('path')

const files = [
  'icon.png',
  'iframe.html',
  'iframe.js',
  'index.css',
  'index.html',
  'index.js',
  'manifest.json',
]
const directories = ['component', 'vendor']
const output = fs.createWriteStream(path.join(process.cwd(), 'yukar.zip'))
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => console.log(`yukar.zip [${archive.pointer()} bytes]`)) // eslint-disable-line no-console
archive.on('error', err => console.error(err)) // eslint-disable-line no-console
archive.pipe(output)
files.forEach(file => archive.file(path.join(process.cwd(), file), { name: file }))
directories.forEach(directory => archive.directory(path.join(process.cwd(), directory), directory))
archive.finalize()
