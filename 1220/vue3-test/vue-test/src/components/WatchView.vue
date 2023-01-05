<template>
    <input type="text" v-model="message.nav.bar.name">
</template>
<script setup lang="ts">
import {reactive, ref,watch} from "vue";

let message = ref({
    nav:{
        bar:{
            name:""
        }
    }
})

// ref,监听单个,监听多个换数组
watch(message,(newV,oldV)=>{
    console.log('新的值----',newV);
    console.log('旧的值----',oldV);
},{
    immediate:true,
    deep:true
})

const message2 = reactive({
    name:"",
    name2:""
})

// 监听reactive，使用reactive监听深层对象开启和不开启deep效果是一样的
// 监听整个
watch(message2,(newV,oldV)=>{});

// 监听内部单个,通过监听返回的getter
watch(()=>message2.name,(newV,oldV)=>{});

//多个
watch([()=>message2.name,()=>message2.name2],(newV,oldV)=>{});





</script>
<style scoped>

</style>