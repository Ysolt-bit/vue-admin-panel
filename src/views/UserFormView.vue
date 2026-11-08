<template>
    <div class="form-page">
        <h2>新增用户</h2>

        <form @submit.prevent="onSubmit">
            <div class="field">
                <label for="name">姓名</label>
                <input id="name"  v-model="form.name" type="text" />
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>
        
        
        <div class="field">
            <label for="email">邮箱</label>
            <input id="email" v-model="form.email" type="text" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
        </div>

        <div class="field">
            <label for="phone">电话</label>
            <input id="phone" v-model="form.phone" type="text" />
        </div>

        <p v-if="submitError" class="error">{{ submitError }}</p>
        <p v-if="success" class="success">提交成功（假接口不会真的保存）</p>

        <button type="submit" :disabled="submitting">
            {{ submitting ? "提交中…" : "提交" }}
        </button>

        </form>
    </div>
</template>

<script setup>
    import {ref,reactive} from "vue";
    import {createUser} from "../api/user";

    const form=reactive({
        name:"",
        email:"",
        phone:""
    });

    const submitting=ref(false);
    const submitError=ref("");
    const success=ref(false);
    const errors=reactive({
        name:"",
        email:""
    });


    function validate(){
        errors.name="";
        errors.email="";

        if(!form.name.trim()){
            errors.name="姓名不能为空";
        }

        const email=form.email.trim();
        if(!email){
            errors.email="邮箱不能为空";
                }else if(!/^\S+@\S+\.\S+$/.test(email)){
            errors.email = "邮箱格式不对，要像 name@example.com";
        }

        return !errors.name && !errors.email;
    }

    async function onSubmit(){
        success.value=false;
        submitError.value="";

        if(!validate())return;

        submitting.value=true;
        try{
            await createUser({...form});
            success.value = true;
            form.name = "";
            form.email = "";
            form.phone = "";
        }catch(e){
            submitError.value = e.message;
        }finally{
            submitting.value = false;
        }
    }
</script>

<style scoped>
.form-page { padding: 20px; }
.field { margin-bottom: 14px; }
.field label {
  display: block;
  margin-bottom: 4px;
  color: #444;
  font-size: 14px;
}
.field input {
  width: 260px;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.error { color: #dc2626; font-size: 13px; margin: 4px 0 0; }
.success { color: #16a34a; font-size: 14px; }
button[type="submit"] {
  padding: 7px 20px;
  cursor: pointer;
}
button[type="submit"]:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>