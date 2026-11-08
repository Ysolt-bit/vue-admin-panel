<template>
  <div class="list-page">
    <h2>用户列表</h2>

    <SearchBar v-model="keyword" />

    <p v-if="store.loading" class="loading">加载中…</p>

    <p v-else-if="store.error" class="error">{{ store.error }}</p>

    <template v-else>
      <p class="count">
        共 {{ filtered.length }} 条，当前第 {{ page }} / {{ totalPages }} 页
      </p>

      <EmptyState
        v-if="filtered.length === 0"
        :text="keyword ? `没有名字包含「${keyword}」的用户` : '暂无用户数据'"
      />

      <template v-else>
        <UserTable :users="paged" />
        <PaginationBar v-model:page="page" :total-pages="totalPages" />
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import SearchBar from "../components/SearchBar.vue";
import UserTable from "../components/UserTable.vue";
import PaginationBar from "../components/PaginationBar.vue";
import EmptyState from "../components/EmptyState.vue";

const store = useUserStore();

const keyword = ref("");
const page = ref(1);
const pageSize = 5;

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  if (!k) return store.users;
  return store.users.filter((u) => u.name.toLowerCase().includes(k));
});

const totalPages = computed(() => {
  return Math.ceil(filtered.value.length / pageSize) || 1;
});

const paged = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filtered.value.slice(start, start + pageSize);
});

watch(keyword, () => {
  page.value = 1;
});

onMounted(() => {
  if (store.users.length === 0) {
    store.fetchUsers();
  }
});
</script>

<style scoped>
.list-page { padding: 20px; }
.error { color: #dc2626; }
.count { color: #666; font-size: 14px; }
</style>
