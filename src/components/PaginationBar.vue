<template>
    <div class="pager">
        <button :disabled="page<=1" @click="go(page-1)">上一页</button>

        <span class="info">{{ page }}/{{ totalPages }}</span>

    <button :disabled="page>=totalPages" @click="go(page+1)">下一页</button>

    </div>
</template>

<script setup>
defineProps({
    page:{
        type:Number,
        required:true
    },
    totalPages:{
        type:Number,
        required:true
    }
});

const emit=defineEmits(["update:page"]);

function go(target){
    emit("update:page",target);
}
</script>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}
.pager button {
  padding: 6px 14px;
  cursor: pointer;
}
.pager button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
.pager button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.info { color: #666; font-size: 14px; }
.pager button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

</style>