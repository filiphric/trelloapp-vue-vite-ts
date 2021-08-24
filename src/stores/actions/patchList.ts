import List from "@/typings/list";
import axios from "axios";

export const patchList =  async function(this: any, list: List, changes: Partial<List>) {
  const { id } = list
  await axios.patch(`/api/lists/${id}`, changes).then( res => {
    const patchedListIndex: number = this.lists.findIndex((c: List) => c.id === id)
    this.lists[patchedListIndex] = res.data
  })
  if (changes.hasOwnProperty('name')) {
    this.showNotification('List was renamed', false)
  }
}