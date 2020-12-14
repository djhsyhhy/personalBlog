<!-- 赞赏模块 -->
<template>
  <div class="reward">
    <div class="tRewardBox tcommonBox">
      <header>
        <h1>
          <a href="#/DetailShare" target="_blank"> 赞赏 </a>
        </h1>
      </header>
      <section>
        <div class="">
          <img src="../../assets/img/timg.jpg" alt="" class="maxW" />
        </div>
        <h1>@赞赏说明：</h1>
        <p>若无特殊说明，赞赏之款项用于给我补充大脑（*/∇＼*）</p>
        <p>如果我给你带来过欢乐，或者对你有所帮助，欢迎赞赏支持:)</p>
        <p>有任何疑问请联系我。</p>
        <hr />
        <h1>@赞赏方式：</h1>
        <el-row :gutter="30">
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img src="../../assets/img/weixin.png" />
              <span>微信扫一扫，向我赞赏</span>
            </div>
          </el-col>
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img src="../../assets/img/zhifu.jpg" />
              <span>支付宝扫一扫，向我赞赏</span>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
    <div class="my">
      <RightAbout />
    </div>
  </div>
</template>

<script>
import RightAbout from "../../components/common/rightAbout/rightAbout";
export default {
  data() {
    //选项 / 数据
    return {};
  },
  methods: {
    //事件处理器
    // showInitDate:function(date,full){//时间处理
    //     return initDate(date,full)
    // }
  },
  components: {
    //定义组件
    RightAbout,
  },
  created() {
    //生命周期函数
    // var that = this;
    // AdmireData(function(msg){//获取用户赞赏数据
    //     // console.log(msg);
    //     that.tableData = msg.data;
    //     that.rewardData = msg.admire_code;
    // })
  },
};
</script>

<style scoped>
.reward {
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-around;
}
.tRewardBox {
  width: 60%;
}
.tRewardBox section {
  padding-bottom: 20px;
}
.tRewardBox section h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  /*text-align: center;*/
  line-height: 30px;
}
.tRewardBox section p {
  margin: 10px 0;
  line-height: 24px;
}
.tRewardBox section hr {
  background: #ccc;
  margin-bottom: 30px;
}

.tRewardBox .donate-item {
  text-align: right;
  color: #44b549;
}
.tRewardBox .donate-item:last-child {
  text-align: left;
  color: #00a0e9;
}
.tRewardBox .donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.tRewardBox .donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  text-align: center;
  box-sizing: border-box;
}
.tRewardBox .donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.tRewardBox .el-table__body-wrapper {
  overflow: hidden;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: transparent;
}
.my {
  width: 40%;
}
</style>
