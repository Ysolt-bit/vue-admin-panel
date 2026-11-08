import { ref } from "vue";
import { defineStore } from "pinia";
import { getUsers } from "../api/user";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref("");

  async function fetchUsers() {
    loading.value = true;
    error.value = "";
    try {
      users.value = await getUsers();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { users, loading, error, fetchUsers };
});
