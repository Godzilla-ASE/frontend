// aws s3 backend support

const express = require('express');
const http = require('http');
const multer = require('multer');
const AWS = require('aws-sdk'),
  {
    Upload
  } = require("@aws-sdk/lib-storage"),
  {
    S3
  } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const upload = multer({ dest: 'uploads/' });

AWS.config.update({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});

const s3 = new S3();

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const fileName = uuidv4() + '.' + file.originalname.split('.').pop();
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await new Upload({
      client: s3,
      params
    }).done();
    res.status(200).send(uploadResult.Location);
  } catch (err) {
    console.error('Error uploading file: ', err);
    res.status(500).send(err);
  }
});

app.post('/upload-progress', upload.single('file'), async (req, res) => {
  const file = req.file;
  const fileName = uuidv4() + '.' + file.originalname.split('.').pop();
  const socketId = req.body.socketId; // 客户端需要发送socketId

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };

  const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
  const upload = s3.upload(params, options);

  upload.on('httpUploadProgress', (progress) => {
    const percent = Math.round((progress.loaded * 100) / progress.total);
    io.to(socketId).emit('progress', percent); // 发送进度到客户端
  });

  try {
    const data = await upload.promise();
    res.status(200).send(data.Location);
  } catch (err) {
    console.error('Error uploading file: ', err);
    res.status(500).send(err);
  }
});


app.listen(3001, () => console.log('Server started on port 3001'));
