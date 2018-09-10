import * as Consumer from 'sqs-consumer'
import * as aws from 'aws-sdk'

export default function SQSConsumer(sqs: aws.SQS) {
  const app = Consumer.create({
    queueUrl: '',
    handleMessage: onMessageReceived,
    sqs
  })

  app.on('error', (err) => {
    console.log(err.message)
  })

  function onMessageReceived(message: aws.SQS.Message,  done) {
    console.log('This is a message from SQS', message.Body)
    done()
  }

  function start() {
    app.start()
  }

  return { start }
}

