<template>
    <div>
        <button @click="change">按钮</button>
        {{state}}
    </div>
</template>
<script setup lang="ts">
import {reactive, toRef, toRefs,toRaw} from 'vue';
// toRef 如果原始对象是非响应式的就不会更新视图 数据会变
// toRefs可以帮我们批量创建ref对象，主要是方便解构使用
// toRew 讲响应式转化为普通对象

const obj = reactive({
    foo:1,
    bar:1
})

// bar 转换为响应式对象
const state = toRef(obj,'bar');

let {foo,bar} = toRefs(obj);

const obj2 = toRaw(obj);

const  change = ()=>{
    state.value++;
    console.log(obj,state);
}

</script>
<style scoped>

</style>