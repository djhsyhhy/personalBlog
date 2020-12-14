<template>
  <div class="main">
    <div class="message">
      <p class="title">Here,You Can Share Your Thoughts With Us</p>
      <div class="">
        <el-row type="flex">
          <el-col class="hidden-xs-only allMes"
            ><CommentUser v-for="item in userCommentList" :key="item._id" :item="item"
          /></el-col>
          <el-col class="hidden-sm-and-up"
            ><CommentUser
              v-for="item in userCommentList"
              :key="item._id"
              :item="item"
              :wid="80"
          /></el-col>
        </el-row>
      </div>
      <div><span>分享你的日常吧</span></div>
      <div class="share">
        <div class="content">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="img">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/upImg"
            :http-request="upload"
            multiple
            :limit="1"
            ref="img-onload"
          >
            <el-button size="small" type="primary" class="showImg"
              >点击上传图片</el-button
            >
          </el-upload>
          <!-- <input type="file" @change="changImg" > -->
          <img class="img-comment" :src="imgUrl" v-if="imgUrl" alt="" />
        </div>
        <div class="sub">
          <div>
            <el-button type="primary" @click="submit"
              >上传<i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {checkToken} from '../../netwoak/token'
import CommentUser from "../../components/common/commentUser/commentUser";
import { getComment, addComment } from "../../netwoak/userComment";
import { upImg } from "../../netwoak/demo";
import { getNowDate } from "../../common/public";
export default {
  // mixins: [checkToken],
  name: "message",
  components: {
    CommentUser,
  },
  data() {
    return {
      userCommentList: [],
      textarea: "",
      imgUrl: "",
      formData: {},
      name: "",
      date: "",
      avatar: "",
    };
  },
  mounted() {
    this.name = localStorage.getItem("user_name");
    this.avatar = localStorage.getItem("avatar");
  },
  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      getComment().then((res) => {
        // console.log(res)
        this.userCommentList = res;
      });
    },
    upload(file) {
      let that = this; //保存this
      let formDatas = new FormData();
      formDatas.append("file", file.file); //设置发送内容
      this.formData = formDatas; //保存
      // console.log(this.formData);
      let fr = new FileReader();
      fr.onload = function (e) {
        console.log(e);
        that.imgUrl = e.target.result;
      };
      fr.readAsDataURL(file.file); //本地显示
    },
    submit() {
      if (!this.name) {
        this.$notify({
          title: "提醒",
          message: "请登录",
          type: "warning",
        });
        return;
      }
      if (!this.textarea) {
        this.$notify({
          title: "提醒",
          message: "请输入评论信息",
          type: "warning",
        });
        return;
      }
      upImg(this.formData).then((res) => {
        if (res.status === 1) {
          let obj = {
            name: this.name,
            avatar: this.avatar,
            date: getNowDate(),
            comments: this.textarea,
            img: res.url,
          };
          addComment(obj).then((res) => {
            if (res.status === 1) {
              this.$message({
                message: "发表成功",
                type: "success",
              });
            }
            //成功之后的各种清除
            this.imgUrl = "";
            this.textarea = "";
            this.$refs["img-onload"].clearFiles(); //
            this.getComment();
          });
        } else {
          this.$notify({
            title: "提醒",
            message: "失败了",
            type: "warning",
          });
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  padding-top: 30px;
  width: 100%;
  background: rgb(232, 229, 235);
}
.message {
  margin-top: 20px;
  width: 80%;
  margin: 0 auto;
  border: 1px solid white;
  border-radius: 8px;
}
.title {
  color: rgb(38, 150, 241);
  font-size: 10px;
}
.allMes {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  justify-content: space-between;
}
.content {
  width: 70%;
  margin: 20px auto;
}
.img {
  position: relative;
  min-height: 400px;
}
.img-comment {
  width: 300px;
}
.showImg {
  margin-left: 40px;
}
.sub {
  display: flex;
  justify-content: center;
}
</style>
