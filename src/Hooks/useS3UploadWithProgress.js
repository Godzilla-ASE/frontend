// import { useState, useEffect } from 'react';
// import AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';

// const useS3UploadWithProgress = () => {
//   const [s3, setS3] = useState(null);

//   useEffect(() => {
//     AWS.config.update({
//       region: process.env.REACT_APP_AWS_REGION,
//       credentials: new AWS.Credentials({
//         accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//       }),
//     });

//     setS3(new AWS.S3());
//   }, []);

//   const uploadImageToS3 = async (file, index, setProgress) => {
//     if (!s3) {
//       console.error('S3 instance is not initialized');
//       return;
//     }

//     const fileName = uuidv4() + '.' + file.name.split('.').pop();
//     const params = {
//       Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
//       Key: fileName,
//       Body: file,
//       ACL: 'public-read',
//       ContentType: file.type,
//     };

//     return new Promise((resolve, reject) => {
//       s3.upload(params)
//         .on('httpUploadProgress', (progressEvent) => {
//           const loaded = progressEvent.loaded
//           const total = progressEvent.total
//           const percent = Math.round((loaded * 100) / total)
//           setProgress((prevProgress) =>
//             prevProgress.map((val, idx) => (idx === index ? percent : val))
//           )
//         })
//         .send((error, data) => {
//           if (error) {
//             setProgress((prevProgress) =>
//               prevProgress.map((val, idx) => (idx === index ? 0 : val))
//             )
//             reject(error)
//           } else {
//             resolve(data.Location)
//           }
//         })
//     });
//   };

//   return { uploadImageToS3 };
// };

// export default useS3UploadWithProgress;


import { useState, useEffect } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';

const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:3001'); // 替换为你的服务器地址

    sock.onopen = function () {
      console.log('connection open');
    };

    sock.onmessage = function (e) {
      console.log('message', e.data);
      const data = JSON.parse(e.data);
      if (data.type === 'progress') {
        setProgress(data.progress);
      }
    };

    sock.onclose = function () {
      console.log('close');
    };

    setSocket(sock);

    return () => {
      sock.close();
    };
  }, []);

  const uploadImageToS3 = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('socketId', socket.id); // 发送socketId到服务器

    try {
      const response = await axios.post('/upload-progress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded: ', response.data);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return { progress, uploadImageToS3 };
};

export default useFileUpload;
