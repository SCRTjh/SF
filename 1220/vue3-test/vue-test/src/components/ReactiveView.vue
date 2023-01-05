<template>
    <div>{{state}}</div>
    <button @click="change1">test1</button>
    <button @click="change2">test2</button>
</template>
<script setup lang="ts">
import { shallowReactive,reactive,readonly } from 'vue';

const obj = {
    a:1,
    first:{
        b:2,
        second:{
            c:3
        }
    }
}

const state = shallowReactive(obj)

function change1(){
    state.a = 7;
    
}

const change2 = ()=>{
    state.first.b = 8;
    state.first.second.c = 9
    console.log(state);
    
}


</script>
<style scoped>

</style>