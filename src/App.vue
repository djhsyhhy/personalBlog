<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import TapBar from './components/common/tapbar/TapBar'
export default {
  name: "app",
  components: {
    TapBar,
  },
};
</script>

<style>

</style>
