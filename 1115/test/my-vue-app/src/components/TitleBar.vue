<template>
    <div class="title-bar">
        <div class="left-back" v-if="showBack" @click="this.$router.back()">
            返回
        </div>
        <slot></slot>
        <div class="right-menu">
            <slot name="menu"></slot>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    showBack: {
        type: Boolean,
        default: false
    }
});

</script>
<style scoped lang="scss">
.title-bar {
    height: 45px;
    background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    .left-back {
        position: absolute;
        left: 10px;
        font-weight: bold;
    }

    .right-menu {
        position: absolute;
        right: 10px;
        font-weight: bold;
    }
}
</style>