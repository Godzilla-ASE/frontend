import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const useS3Upload = () => {
  const uploadImageToS3 = async (file) => {
    const fileName = uuidv4() + '.' + file.name.split('.').pop();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // 这应该是图片的URL
    } catch (error) {
      console.error('上传文件时发生错误:', error);
    }
  };

  return { uploadImageToS3 };
};

export default useS3Upload;
