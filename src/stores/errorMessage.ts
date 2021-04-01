import { defineStore } from "pinia";

export const errorMessage = defineStore({
  id: "errorMessage",
  state() {
    return {
      show: false,
      message: ""
    };
  },
  actions: {
    showError(message: string) {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        // hide error message after 4 seconds
        this.show = false;
      }, 4000);
    }
  }
});
