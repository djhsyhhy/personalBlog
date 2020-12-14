<template>


<div class="about">
    <div class="my">
      <p>{{ value.title }}</p>
    </div>
    <div class="my-introduce">
      <p v-for="(item, index) in value.content" :key="index">{{ item }}</p>
    </div>
  </div>
  
</template>

<script>

export default {
props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
  },


 
};
</script>

<style scoped>
.about {
  width: 70%;
  margin: 0 auto;
  margin-bottom: 20px;
  background: rgb(243, 236, 236);
}
.my {
  /* font-weight: 400; */
  font-size: 30px;
  margin-left: 10px;
  padding-top: 20px;
  border-bottom: 2px solid red;
}
.my-introduce {
  margin: 5px 0 5px 40px;
  font-size: 16px;
  line-height: 30px;
}
</style>