import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const useS3UploadWithProgress = () => {
  const [s3, setS3] = useState(null);

  useEffect(() => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      }),
    });

    setS3(new AWS.S3());
  }, []);

  const uploadImageToS3 = async (file, index, setUploadProgress) => {
    if (!s3) {
      console.error('S3 instance is not initialized');
      return;
    }

    const fileName = uuidv4() + '.' + file.name.split('.').pop();
    const params = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Key: fileName,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params)
        .on('httpUploadProgress', (progressEvent) => {
          const loaded = progressEvent.loaded
          const total = progressEvent.total
          const percent = Math.round((loaded * 100) / total)
          setUploadProgress((prevProgress) =>
            prevProgress.map((val, idx) => (idx === index ? percent : val))
          )
        })
        .send((error, data) => {
          if (error) {
            setUploadProgress((prevProgress) =>
              prevProgress.map((val, idx) => (idx === index ? 0 : val))
            )
            reject(error)
          } else {
            resolve(data.Location)
          }
        })
    });
  };

  return { uploadImageToS3 };
};

export default useS3UploadWithProgress;
