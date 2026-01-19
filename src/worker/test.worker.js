self.addEventListener('message', event => {
  const { key, value } = event.data
  // this line is violating eslint rule
  self.postMessage({ key, value: JSON.stringify(value) })
})

export default self
