<template>
  <div class="detail-page">
    <RouterLink to="/users">返回列表</RouterLink>
    <h2>用户详情</h2>
    <p v-if="loading">加载中</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else-if="!user" class="empty">找不到id为{{ route.params.id }}的用户</p>
    <dl v-else class="info">
      <dt>姓名</dt><dd>{{ user.name }}</dd>
      <dt>用户名</dt><dd>{{ user.username }}</dd>
      <dt>邮箱</dt><dd>{{ user.email }}</dd>
      <dt>电话</dt><dd>{{ user.phone }}</dd>
      <dt>网站</dt><dd>{{ user.website }}</dd>
      <dt>公司</dt><dd>{{ user.company.name }}</dd>
      <dt>城市</dt><dd>{{ user.address.city }}</dd>
    </dl>
  </div>
</template>

<script setup>
  import {ref,watch} from "vue";
  import {useRoute} from "vue-router";
  import {getUserById} from "../api/user";

  const route=useRoute();

  const user=ref(null);
  const loading=ref(false);
  const error=ref("");

  async function load(id){
    loading.value=true;
    error.value="";
    user.value=null;
    try{
      user.value=await getUserById(id);
    }catch(e){
      error.value=e.message;
    }finally{
      loading.value=false;
    }
  }
  watch(
    ()=>route.params.id,
    (id)=>{
      if(id) load(id);
    },
    {immediate:true}
  );
</script>

<style scoped>
.detail-page { padding: 20px; }
.error { color: #dc2626; }
.empty { color: #dc2626; }
.info {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px 16px;
  max-width: 480px;
}
.info dt { color: #666; }
.info dd { margin: 0; }
</style>