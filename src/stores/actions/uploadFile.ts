import Card from "@/typings/card";
import axios from "axios";

export const uploadFile =  async function(this: any, acceptFiles: File[], card: Card) {
    const formData = new FormData();
    const file = acceptFiles[0]
    const { id } = card
    formData.append("image", file);
    axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          id
        }
    }).then( (upload) => {
        this.showNotification('File was sucessfully uploaded', false);
        const uploadedImagePath = upload.data.path

        this.patchCard(card, { image: uploadedImagePath })
          
      }).catch(() => {
        this.showNotification('There was an error uploading file', true);
      });
  }