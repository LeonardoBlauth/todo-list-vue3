import { defineStore } from "pinia";

export const useViewStore = defineStore({
  id: "view",
  state: () => ({
    view: "all",
  }),
  actions: {
    setView(value: string) {
      this.view = value;
    },
  },
});
