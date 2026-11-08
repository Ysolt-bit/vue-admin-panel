<template>
    <div class="table-wrap">

    <table class="user-table">
        <thead>
            <tr>
                <th>#</th>
                <th>姓名</th>
                <th>邮箱</th>
                <th>电话</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u in users" :key="u.id">
                <td>{{u.id}}</td>
                <td>{{u.name}}</td>
                <td>{{u.email}}</td>
                <td>{{u.phone}}</td>
                <td>
                    <RouterLink :to="`/users/${u.id}`">详情</RouterLink>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script setup>
    defineProps({
        users:{
            type:Array,
            required:true
        }
    });
</script>

<style scoped>
    .table-wrap{
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    .user-table{
        width:100%;
        min-width: 560px;
        border-collapse:collapse;
    }
    .user-table th,
    .user-table td{
        border:1px solid #ddd;
        padding:8px 12px;
        text-align:left;
    }
    .user-table th{
        background:#f5f5f5;
    }
    @media(max-width:640px){
        .user-table th:nth-child(4),
        .user-table td:nth-child(4){
            display: none;
        }
    }
</style>