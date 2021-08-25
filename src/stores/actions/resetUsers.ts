import axios from "axios";

export const resetUsers =  async function(this: any) {
  await axios.delete('/api/users');
  this.showNotification('All users were deleted', false)
}