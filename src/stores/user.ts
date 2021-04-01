import { defineStore } from "pinia";

export const user = defineStore({
  id: "user",
  state() {
    return {
      user: {
        loggedIn: false,
        email: ''
      }
    };
  }
});
