<template>
  <div class="main hidden-sm-and-down">
    <div class="my">
      <div class="img">
        <img src="../../../assets//img/tou.png" alt="" />
      </div>
      <div class="name"><span>邵毅涵</span></div>
      <div class="specialty"><span>计算机科学与技术</span></div>
      <div class="specialty"><span>2018-2022 学生</span></div>
      <div class="art"><span>前端： vue + element</span></div>
      <div class="art"><span>后台： vue + element</span></div>
      <div class="art"><span>服务器： node + mongodb</span></div>
    </div>
    <p class="callme">快来联系我吧</p>
    <div class="about">
      <div>
        <a href="http://localhost:8888/qq.png" target="_blank"
          ><i class="iconfont iconqq"
        /></a>
      </div>
      <div>
        <a href="https://github.com/djhsyhhy" target="_blank"
          ><i class="iconfont icongithub"></i
        ></a>
      </div>

      <div>
        <a href="http://localhost:8888/weixin.jpg" target="_blank"
          ><i class="iconfont iconweixin"></i
        ></a>
      </div>
    </div>
    <div class="other"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  width: 60%;
  /* margin: 0 auto; */
  border: 1px solid wheat;
  border-radius: 10px;
}
.my {
  text-align: center;
}
.img {
  margin: 0 auto;
  opacity: 0.7;
  overflow: hidden;
}
.img img {
  border-radius: 50%;
  transition: all 0.6s;
}
.img img:hover {
  transform: rotate(180deg);
  cursor: pointer;
}
.name {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: rgb(38, 147, 236);
  padding-top: 5px;
}
.specialty {
  font-weight: 500;
  font-size: 14px;
  line-height: 30px;
  color: rgb(38, 147, 236);
}
.art {
  font-size: 12px;
  color: rgb(228, 240, 63);
  line-height: 20px;
}

.about {
  display: flex;
  margin: 30px auto;
  justify-content: space-around;
  justify-items: center;
}
.callme {
  text-align: center;
  font-weight: 18px;
  margin: 20px auto;
}
.about div {
  width: 30px;
}
.about div a i {
  text-align: center;
  font-size: 40px;
}
</style>
