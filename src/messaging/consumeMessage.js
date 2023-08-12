const amqp = require('amqplib')
const rabbitmq_config = require('./rabbitmq_config')
const adjustQuantity = require('./adjustQuantity')

async function consumeMessages() {
  const connection = await amqp.connect(rabbitmq_config.rabbitmq.url)

  const channel = await connection.createChannel()

  await channel.assertExchange(rabbitmq_config.rabbitmq.exchange, 'direct')

  const q = await channel.assertQueue('orders')

  await channel.bindQueue(
    q.queue,
    rabbitmq_config.rabbitmq.exchange,
    'Order_Created'
  )
  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content)
    adjustQuantity(data.message)
    console.log(data)
    channel.ack(msg)
  })
}

module.exports = consumeMessages
