const amqp = require('amqplib')
const rabbitmq_config = require('./rabbitmq_config')
const adjustQuantity = require('./adjustQuantity')

class RabbitMqClient {
  channel
  connection

  async connectAndStartListening() {
    this.connection = await amqp.connect(rabbitmq_config.rabbitmq.url)

    this.channel = await this.connection.createChannel()

    await this.channel.assertExchange(
      rabbitmq_config.rabbitmq.orderExchange,
      'direct'
    )

    const q = await this.channel.assertQueue('orders', { durable: true })

    await this.channel.bindQueue(
      q.queue,
      rabbitmq_config.rabbitmq.orderExchange,
      'Order_Created'
    )
    this.channel.consume(q.queue, (msg) => {
      const data = JSON.parse(msg.content)
      try {
        adjustQuantity(data.message)
        this.channel.ack(msg)
        console.log('message was consumed successfully')
      } catch (err) {
        console.log(err)
        this.channel.reject(msg, true)
      }
    })
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.connectAndStartListening()
    }

    const { productExchange } = rabbitmq_config.rabbitmq
    await this.channel.assertExchange(productExchange, 'direct')

    await this.channel.publish(
      productExchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          routingKey,
          message,
        })
      ),
      { persistent: true }
    )

    console.log('Message was published')
  }
}

module.exports = new RabbitMqClient()
