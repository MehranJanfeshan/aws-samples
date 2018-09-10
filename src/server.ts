import * as express from 'express'
import * as bodyParser from 'body-parser'
import account from './routes/account'
import SQSConsumer from './lib/sqs-consumer'
import * as aws from 'aws-sdk'

export default function () {

  aws.config.region = 'ap-southeast-1'
  aws.config.secretAccessKey = ''
  aws.config.accessKeyId = ''
  const sqs = new aws.SQS({ apiVersion: '2012-11-05' })
  const SNS = new aws.SNS({ apiVersion: '2010-03-31' })
  const S3 = new aws.S3({ apiVersion: '2006-03-01' })

  const sqsConsumer = SQSConsumer(sqs)
  const app = express()
  app.use(bodyParser.json())
  createRoute()

  app.listen(3000, (err) => {
    if (err) {
      return console.log(err)
    }
  })

  function createRoute() {
    let router: express.Router
    router = express.Router()
    account(router, sqs, SNS, S3)

    app.use(router)
  }

  sqsConsumer.start()
}
