export default function (fileName, content) {
  const link = document.createElement('a')
  const blob = new Blob([content])

  link.download = fileName
  link.href = URL.createObjectURL(blob)
  link.click()
}
