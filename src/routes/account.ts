import * as express from 'express'
import { Request } from 'express'
import { Response } from 'express'
import AccountMiddleware from '../middlewares/account'
import * as aws from 'aws-sdk'
import { SendMessageResult } from 'aws-sdk/clients/sqs'


export default function AccountRoute(router: express.Router, sqs: aws.SQS, sns: aws.SNS, s3: aws.S3) {

  const accountMiddleware = AccountMiddleware()
  router.get('/account/:id', accountMiddleware.validateGetFunction, async (req: Request, res: Response) => {
    try {
      const result = await InsertSQS(req.params.id)
      const snsResponse = await publishSNS(req.params.id)
      const s3response = await listObjectFromS3()
      console.log('This is sns response', snsResponse, s3response)
      res.send({ result, snsResponse, s3response})
    } catch (err) {
    }
  })

  function InsertSQS(accountId: string): Promise<SendMessageResult> {
    return sqs.sendMessage({
      QueueUrl: '',
      MessageBody: accountId
    }).promise()
  }

  function publishSNS(accountId: string) {
    return sns.publish({
      TopicArn: '',
      Message: `this is a new account ${accountId}`
    }).promise()
  }

  function listObjectFromS3() {
    s3.putObject()
    return s3.listObjects({
      Bucket: 'account-yp'
    }).promise()

  }
}