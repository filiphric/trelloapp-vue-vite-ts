import Card from '@/typings/card';
import axios from 'axios';

export const uploadFile = async function(this: any, card: Card, acceptFile?: File) {
  const formData = new FormData();
  const file = acceptFile;
  const { id } = card;
  file && formData.append('image', file);
  axios
    .post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        id
      }
    })
    .then(upload => {
      this.showNotification('File was sucessfully uploaded', false);
      const uploadedImagePath = upload.data.path;

      this.patchCard(card, { image: uploadedImagePath });
    })
    .catch(() => {
      this.showNotification('There was an error uploading file', true);
    });
};
