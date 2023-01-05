<template>
    <div>
        <button @click="changeMsg">change</button>
        <div>{{message}}</div>
        <hr>
        <div ref="div">SCR-ref</div>
        <div>{{name}}</div>
        <button @click="change">修改 customRef</button>
    </div>
</template>
<script setup lang="ts">
import { Ref,ref,shallowRef,triggerRef,customRef } from 'vue';

type Obj = {
    name:string
}

// 监听浅层
let message:Ref<Obj> = shallowRef({
    name:"tjh"
})

let div = ref(null);

const changeMsg = ()=>{
    // message.value = {name:"SCR"}
    message.value.name = "SCR";
    console.log(div);
    triggerRef(message) //强制更新DOM页面
}

function myRef<T = any>(value:T){
    let timer:any;
    // customRef是个工厂函数要求我们返回一个对象,并且实现get和set适合去做防抖之类的
    return customRef((track,trigger)=>{
        return {
            get(){
                track()
                return value
            },
            set(newVal){
                clearTimeout(timer)
                timer = setTimeout(()=>{
                    console.log('触发了set');
                    value=newVal;
                    trigger()
                    
                },500)
            }
        }
    })
}

const name = myRef<string>('小满');

const change = ()=>{
    name.value = '大满'
}



</script>
<style scoped>

</style>