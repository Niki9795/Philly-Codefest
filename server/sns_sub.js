const express = require("express");
const AWS = require('aws-sdk');
const request = require('request')
const bodyParser = require('body-parser')
const app = express();
var SNS_TOPIC_ARN = "arn:aws:sns:topic_location:xxxx:topic_name";

// configure AWS
AWS.config.update({
    'accessKeyId': 'mykey',
    'secretAccessKey': 'mysecretkey',
    "region":"myregion"
});
const sns = new AWS.SNS();

app.get('/', (req, res) => {
    var params = {
        Protocol: 'http', /* required */   //http , https ,application
        TopicArn: SNS_TOPIC_ARN, /* required */   // topic you want to subscribe
        Endpoint: 'http://ec2-xx-xx-xx-xxx.myregion.compute.amazonaws.com/', // the endpoint that you want to receive notifications.
        ReturnSubscriptionArn: true //|| false
    };

    sns.subscribe(params, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);

        }
    });
    res.end();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/notify', (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    let payload = JSON.parse(body)

    if (payload.Type === 'SubscriptionConfirmation') {
      const promise = new Promise((resolve, reject) => {
        const url = payload.SubscribeURL

        request(url, (error, response) => {
          if (!error && response.statusCode == 200) {
            console.log('Yess! We have accepted the confirmation from AWS')
            return resolve()
          } else {
            return reject()
          }
        })
      })

      promise.then(() => {
        res.end("ok")
      })
    }
  })
})