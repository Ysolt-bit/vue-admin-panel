<template>
    <div class="search-bar">
        <input
            :value="modelValue"
            type="search"
            placeholder="按姓名搜索"
            @input="onInput"
        />
        <button v-if="modelValue" type="button" @click="clear">清空</button>
    </div>
</template>

<script setup>
    defineProps({
        modelValue:{
            type:String,
            default:""
        }
    });

    const emit=defineEmits(["update:modelValue"]);

    function onInput(e){
        emit("update:modelValue",e.target.value);
    }

    function clear(){
        emit("update:modelValue","");
    }
</script>
    
 

<style scoped>
.search-bar{
    display:flex;
    gap:8px;
    margin-bottom:12px;
}
.search-bar input{
    flex:1;
    max-width:280px;
    padding:6px 10px;
    border:1px solid #ddd;
    border-radius:4px;
}
.search-bar button{
    padding:6px 12px;
    cursor:pointer;
}
</style>