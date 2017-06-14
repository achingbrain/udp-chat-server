const dgram = require('dgram')

module.exports = ({port = 48392, multicast = '230.185.192.108', ttl = 128, address = '0.0.0.0', onMessage}) => {
  const socket = dgram.createSocket({
    type: 'udp4',
    reuseAddr: true
  }).bind({
    port: port,
    address: address,
    exclusive: false
  })

  socket.on('listening', () => {
    socket.setBroadcast(true)
    socket.setMulticastTTL(ttl)
    socket.addMembership(multicast)
  })

  socket.on('message', function (data, remote) {
    try {
      const message = JSON.parse(data.toString())
      message.remote = remote

      onMessage(message)
    } catch (error) {
      console.error(error)
    }
  })

  return (message) => {
    const data = JSON.stringify(message)
      .replace(/[\u007f-\uffff]/g, (c) => '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4))

    console.info('sending', data)

    socket.send(data, 0, data.length, port, multicast)
  }
}
