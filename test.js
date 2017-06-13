const chat = require('./index')

const send = chat({
  onMessage: (message) => {
    console.info('got', message)
  }
})

send('hello world')
