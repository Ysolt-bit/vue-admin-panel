<template>
  <div class="empty">
    <p class="icon">—</p>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "暂无数据"
  }
});
</script>

<style scoped>
.empty {
  padding: 40px 0;
  text-align: center;
  color: #999;
  border: 1px dashed #ddd;
  border-radius: 6px;
}
.icon { font-size: 24px; margin: 0; }
.text { margin: 8px 0 0; }
</style>
