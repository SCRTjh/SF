<template>
  <router-view #default="{ Component }">
    <keep-alive :include="keepAliveList">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
<script>
import keepAliveList from "./router/keepAliveList.js";
export default {
  name: "App",
  data() {
    return {
      keepAliveList
    }
  }


}
</script>
<style lang="scss">
@import url('./assets/iconfont/iconfont.css');
</style>