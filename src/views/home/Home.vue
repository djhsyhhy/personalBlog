<template>
  <div class="home">
    <TapBar class="tap" />
    <keep-alive exclude="Detail Tourist">
      <router-view></router-view>
    </keep-alive>

    <el-backtop class="back"> </el-backtop>
  </div>
</template>

<script>
import TapBar from "components/common/tapbar/TapBar";
export default {
  name: "Home",
  components: {
    TapBar,
  },
};
</script>

<style scoped>
.back {
  background: rgb(108, 104, 112);
  opacity: 0.7;
}
.tap {
}
</style>
