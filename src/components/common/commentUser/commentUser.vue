<template>
  <div class="detail" :style="{ width: wid + '%' }">
    <div class="title">
      <div class="userImg">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="titleUser">
        <p class="name">{{ item.name }}</p>
        <p class="time">{{ item.date }}</p>
      </div>
    </div>
    <div class="comment">
      {{ item.comments }}
    </div>
    <div class="img">
      <img :src="item.img" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.item);
  },
  name: "commentUser",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    wid: {
      type: Number,
      default() {
        return 30;
      },
    },
  },
};
</script>

<style scoped>
.detail {
  margin: 20px auto;
  border: 1px solid rgb(163, 158, 158);
  border-radius: 4px;
  padding: 10px;
}
.title {
  display: flex;
}
.userImg {
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.userImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.titleUser {
  margin-left: 20px;
}
.name {
  font-weight: 600;
  color: red;
  margin-top: 5px;
}
.time {
  margin-top: 10px;
  color: rgb(163, 158, 158);
  font-size: 12px;
}
.img {
  width: 100%;
  /* height: 200px; */
}
.img img {
  width: 100%;
}
.comment {
  margin: 3px;
}
</style>
