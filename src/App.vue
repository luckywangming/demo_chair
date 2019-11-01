<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "./page/index"
export default {
  name: "app",
  components: {
  },
  data() {
    return {
      
    };
  },
};
</script>

<style lang="stylus">
@import "./assets/css/reset.css";
</style>
