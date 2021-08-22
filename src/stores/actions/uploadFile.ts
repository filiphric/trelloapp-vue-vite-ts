import Card from "@/typings/card";
import axios from "axios";

export const uploadFile =  async function(this: any, acceptFiles: File[], cardId: Card['id']) {
    const formData = new FormData();
    const file = acceptFiles[0]
    formData.append("image", file);
    axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          cardId
        }
    }).then( (upload) => {
        this.showNotification('File was sucessfully uploaded', false);
        const uploadedImagePath = upload.data.path
        axios.patch(`/api/cards/${cardId}`, {
          image: uploadedImagePath
        }).then( res => {
          const patchedCardIndex: number = this.cards.findIndex((c: Card) => c.id === cardId)
          this.cards[patchedCardIndex] = res.data
          this.activeCard = res.data
        });
      }).catch(() => {
        this.showNotification('There was an error uploading file', true);
      });
  }