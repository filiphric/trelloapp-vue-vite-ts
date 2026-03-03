import Card from '@/typings/card';
import axios from 'axios';

export const uploadFile = async (set: any, get: any, card: Card, acceptFile?: File) => {
  const formData = new FormData();
  const file = acceptFile;
  const { id } = card;
  file && formData.append('image', file);
  axios
    .post(`/api/upload?card=${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((upload) => {
      get().showNotification('File was sucessfully uploaded', false);
      set({ activeCard: upload.data });
    })
    .catch(() => {
      get().showNotification('There was an error uploading file', true);
    });
};
