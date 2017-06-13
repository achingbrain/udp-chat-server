#! /usr/bin/env node

const chat = require('../index')

chat({
  onMessage: (data, sender) => {
    console.info('Recieved', data, 'from', sender)
  }
})
