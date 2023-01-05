<template>
    <div>
        <div>price:{{m}}</div>
        <div>price:{{mul}}</div>
        <button @click="change">加加</button>
    </div>
</template>
<script setup lang="ts">
import { computed,reactive,ref } from 'vue';
let price:any = ref(0);

let m = computed<string>(()=>{
    return '$' + price.value;
})

let mul = computed({
    get:()=>{
        return '￥'+price.value
    },
    set:(v)=>{
         price.value = 'set' + v;
    }
})

const change = ()=>{
    price.value++;
}

</script>
<style scoped>

</style>