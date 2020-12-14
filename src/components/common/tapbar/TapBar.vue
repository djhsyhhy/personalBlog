<template>
  <div class="tapBar">
    <el-row :gutter="10" class="head" style="margin=0">
      <el-col
        style="transition: all 0.5s ease-out; margin-bottom: 30px"
        class="hidden-xs-only"
      >
        <!-- pc -->
        <div class="pc">
          <div class="left">
            <div class="background">
              <a @click="handlogn" style="color: yellow">Loneliness</a>
            </div>
            <div class="title">Write the Code. Change the World</div>
          </div>
          <div class="right">
            <div
              class="right-item"
              v-for="(item, index) in title"
              :key="index"
              @click="replaceRoute(item, index)"
            >
              <span :class="[curIndex == index ? 'active ' : '']">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 移动端 -->
      <el-col
        style="transition: all 0.5s ease-out; margin-bottom: 30px"
        class="hidden-sm-and-up"
      >
        <div class="model">
          <div class="left">
            <div class="background">
              <a @click="handlogn" style="color: yellow">Loneliness</a>
            </div>
            <div class="title hidden-xs-only">Write the Code. Change the World</div>
          </div>
          <div class="select">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="black"
              active-text-color="rgb(115, 115, 221)"
              text-color="white"
            >
              <el-submenu index="2">
                <template slot="title" style="height=50px;">ALL</template>
                <el-menu-item
                  :index="item.path"
                  v-for="(item, index) in title"
                  :key="index"
                  >{{ item.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="back-img hidden-xs-only">
      <div class="main-title">
        <span class="">Hi,Aimee</span>
      </div>
      <div class="pesonal-title">
        <div>
          <img
            class="pesonal-img"
            src="../../../assets/img/tou.png"
            alt=""
            @click="handAbout"
          />
        </div>
        <p @click="handAbout">Write the Code. Change the World.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route.path, this.title)
    this.title.map((item, index) => {
      //解决导航问题
      if (this.$route.path == item.path) {
        this.curIndex = index;
      }
    });
  },

  components: {},
  data() {
    return {
      title: [
        {
          name: "首页",
          class: "fa fa-wa fa-home",
          path: "/home/homeMain",
        },
        {
          name: "赞赏",
          class: "fa fa-wa fa-cny",
          path: "/reward",
        },
        // {
        //   name: "伙伴",
        //   class: "fa fa-wa fa-users",
        //   path: "/friendslink",
        // },
        {
          name: "留言板",
          class: "fa fa-wa fa-pencil",
          path: "/message",
        },
        {
          name: "关于",
          class: "fa fa-wa fa-vcard",
          path: "/aboutme",
        },
        {
          name: "登录注册",
          class: "fa fa-wa fa-vcard",
          path: "/logn",
        },
      ],
      curIndex: 0,
    };
  },
  methods: {
    handleSelect(e) {
      // console.log(e);
      this.$router.push(e);
    },
    handAbout() {
      this.$router.push("/aboutme");
    },
    replaceRoute(item, index) {
      this.curIndex = index;
      this.$router.push(item.path);
    },
    handlogn() {
      window.open("#/home/homeMain");
    },
  },
};
</script>

<style scoped>
.tapBar {
  z-index: 999 !important;
  /* height: 50px; */
  position: relative;
}
.head {
  width: 100%;
  position: fixed;
  height: 50px;
  top: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;
  margin: 0 !important;
}
.pc {
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 50px;
  overflow: hidden;
}
.left {
  width: 30%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-left: 30px;
}
.background {
  cursor: pointer;
  font-size: 22px;
  color: yellow;
  font-weight: 700;
  margin-right: 10px;
}
.title {
  font-size: 12px;
}
.title:hover {
  color: rgb(253, 251, 251);
}
.active {
  color: #f5f5f5;
}

.right {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
}
.right-item {
  height: 100%;
  text-align: center;
  margin: 0 30px;
}
.right-item:hover {
  color: rgb(250, 246, 246);
}
.right-item span {
  line-height: 50px;
}
.model {
  display: flex;
  justify-content: space-around;
  justify-items: center;
  height: 50px;
}
.model-left {
  width: 70%;
  display: flex;
  margin-left: 30px;
  justify-items: center;
}
.select {
  height: 50px;
  overflow: hidden;
}
.select ul li {
  display: inline-block;
  height: 50px;
}
.back-img {
  background-image: url("../../../assets//img/headbg05.jpg");
  position: relative;
  top: 50px;
  height: 680px;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  /* margin-bottom: 50px; */
}

.main-title {
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 100px;
  font-weight: 1000;
  transform: translate(-50%, -50%);
  color: rgb(115, 115, 221);
  transition: all 2s;
  animation: dot 2s linear 0s 1;
  overflow: hidden;
}
@-webkit-keyframes dot {
  0% {
    width: 0;
    margin-right: 100%;
  }
  33% {
    width: 0.5em;
    margin-right: 66%;
  }
  66% {
    width: 1em;
    margin-right: 33%;
  }
  100% {
    width: 1.5em;
    margin-right: 0;
  }
}
.pesonal-title {
  width: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  font-size: 30px;
  font-weight: 500;
  transform: translate(-50%, 0);
  color: rgb(206, 113, 113);
  background: #f5f5f5;
  opacity: 0.6;
  text-align: center;
}
.pesonal-title img {
  margin: 0 auto;
  margin-bottom: 30px;
  border-radius: 50%;
  transition: all 0.4s;
}
.pesonal-img:hover {
  transform: rotate(180deg);
  cursor: pointer;
}
.pesonal-title p:hover {
  cursor: pointer;
}
</style>
