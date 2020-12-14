<template>
  <div class="articleItem" @click="hand">
    <div>
      <div class="title">
        <span class="main">{{ item.title }}</span>
      </div>

      <div class="img">
        <img class="img-main" :src="item.imgUrl" alt="404" />
      </div>
      <div class="gist">
        <span>{{ item.gist }}</span>
      </div>
      <div class="time">
        <span class="date">{{ item.date.slice(2, 11) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    hand() {
      this.$router.push("/detail/" + this.item._id);
    },
  },
};
</script>

<style scoped>
.articleItem {
  position: relative;
  margin-bottom: 20px;
  translate: all 0.5s;
  width: 70%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid wheat;
  border-radius: 10px;
}

.articleItem :hover {
  box-shadow: 10px 10px 10px rgb(183, 173, 194);
}

.title {
  color: rgb(30, 114, 209);
  font-size: 20px;
  font-weight: 200;
  line-height: 40px;
  margin-left: 5px;
}

.img {
  overflow: hidden;
  border-radius: 6px;
}
.img-main {
  width: 100%;
  transition: all 2s;
}
.img :hover {
  transform: translate(-2px, -3px) scale(1.1);
}
.gist {
  font-size: 14px;
  color: rgb(112, 162, 182);
  margin: 10px;
}
.time {
  font-size: 10px;
  text-align: right;
}
</style>
