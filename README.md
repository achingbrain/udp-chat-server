# udp-chat-server

Simple echo server that broadcasts & listens for UDP traffic.

## Installation

```sh
$ npm install udp-chat-server
```

## Usage

```javascript
import chat from 'udp-chat-server'

const send = chat({
  onMessage: ({message, remote}) => {
    console.info('Received', message, 'from', remote)
  }
})

send({
  message: 'Hello world'
})
```
