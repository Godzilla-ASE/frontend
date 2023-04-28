require('dotenv').config();

const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');

const app = express();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1'
})

const S3 = new AWS.S3()

const upload = multer({
  storage: multer.memoryStorage(),
})

app.post('/upload', upload.array('images'), (req, res, next) => {
  const files = req.files
  const uploadPromises = files.map((file) => {
    const s3Params = {
      Bucket: 'godzilla2023ase',
      Key: file.originalFilename,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }

    return new Promise((resolve, reject) => {
      S3.upload(s3Params, (err, data) => {
        if (err) {
          console.error('Error uploading to S3: ', err)
          reject(err)
        } else {
          resolve(data.Location)
        }
      })
    })
  })

  Promise.all(uploadPromises)
    .then(imageUrls => {
      res.json({ imageUrls })
    })
    .catch(err => {
      console.error('Error uploading to S3: ', err);
      res.status(500).send('Error uploading to S3')
    })
})

